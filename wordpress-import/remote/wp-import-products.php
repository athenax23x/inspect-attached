<?php
/**
 * Importer produk sekali pakai untuk Dirt & Dawn.
 *
 * Membuat atau memperbarui produk berdasarkan SKU, memasang gambar produk dari
 * folder staging, dan menetapkan kategori. Idempoten: menjalankan ulang tidak
 * menggandakan produk.
 *
 * Dipanggil via HTTP dengan ?token=... yang sama dengan isi wp-import-token.txt.
 * Menghapus dirinya sendiri, berkas token, JSON, dan folder staging setelah selesai.
 *
 * @package DirtAndDawn
 */

declare( strict_types = 1 );

header( 'Content-Type: application/json; charset=utf-8' );
header( 'X-Robots-Tag: noindex, nofollow' );

$dir        = __DIR__;
$token_file = $dir . '/wp-import-token.txt';
$data_file  = $dir . '/products-catalog.json';
$stage_dir  = $dir . '/product-images';

$cleanup = static function () use ( $token_file, $data_file, $stage_dir ): void {
	@unlink( __FILE__ ); // phpcs:ignore WordPress.PHP.NoSilencedErrors
	@unlink( $token_file ); // phpcs:ignore WordPress.PHP.NoSilencedErrors
	@unlink( $data_file ); // phpcs:ignore WordPress.PHP.NoSilencedErrors
	if ( is_dir( $stage_dir ) ) {
		foreach ( (array) glob( $stage_dir . '/*' ) as $file ) {
			@unlink( $file ); // phpcs:ignore WordPress.PHP.NoSilencedErrors
		}
		@rmdir( $stage_dir ); // phpcs:ignore WordPress.PHP.NoSilencedErrors
	}
};

function dnd_json( array $payload ): string {
	return (string) json_encode( $payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES );
}

if ( ! is_readable( $token_file ) || ! is_readable( $data_file ) ) {
	http_response_code( 500 );
	echo dnd_json( array( 'ok' => false, 'error' => 'Berkas token atau JSON tidak ditemukan.' ) );
	exit;
}

$expected = trim( (string) file_get_contents( $token_file ) );
$given    = isset( $_GET['token'] ) ? (string) $_GET['token'] : '';
if ( '' === $expected || ! hash_equals( $expected, $given ) ) {
	http_response_code( 403 );
	echo dnd_json( array( 'ok' => false, 'error' => 'Token salah.' ) );
	exit;
}

$catalog = json_decode( (string) file_get_contents( $data_file ), true );
if ( ! is_array( $catalog ) ) {
	http_response_code( 500 );
	echo dnd_json( array( 'ok' => false, 'error' => 'JSON katalog tidak valid.' ) );
	$cleanup();
	exit;
}

require_once $dir . '/wp-load.php';

if ( ! function_exists( 'wc_get_product' ) ) {
	http_response_code( 500 );
	echo dnd_json( array( 'ok' => false, 'error' => 'WooCommerce tidak aktif.' ) );
	$cleanup();
	exit;
}

require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

/**
 * Pastikan istilah kategori ada, termasuk induknya.
 *
 * @param string[] $names Jalur kategori, mis. ['Apparel','Tees'].
 * @return int[] ID istilah.
 */
function dnd_ensure_categories( array $names ): array {
	$ids    = array();
	$parent = 0;
	foreach ( $names as $name ) {
		$name = trim( (string) $name );
		if ( '' === $name ) {
			continue;
		}
		$term = get_term_by( 'name', $name, 'product_cat' );
		if ( $term instanceof WP_Term ) {
			$ids[]  = (int) $term->term_id;
			$parent = (int) $term->term_id;
			continue;
		}
		$created = wp_insert_term( $name, 'product_cat', array( 'parent' => $parent ) );
		if ( is_wp_error( $created ) ) {
			continue;
		}
		$ids[]  = (int) $created['term_id'];
		$parent = (int) $created['term_id'];
	}
	return $ids;
}

/**
 * Salin gambar staging ke Media Library dan kembalikan ID lampirannya.
 */
function dnd_attach_image( string $stage_dir, string $slug, string $title ): int {
	$source = $stage_dir . '/' . $slug . '.png';
	if ( ! file_exists( $source ) ) {
		return 0;
	}

	$uploads = wp_upload_dir();
	if ( ! empty( $uploads['error'] ) ) {
		return 0;
	}

	$filename = 'dirt-dawn-' . sanitize_file_name( $slug ) . '.png';
	$dest     = trailingslashit( $uploads['path'] ) . $filename;
	if ( ! copy( $source, $dest ) ) {
		return 0;
	}

	$id = wp_insert_attachment(
		array(
			'post_mime_type' => 'image/png',
			'post_title'     => $title,
			'post_status'    => 'inherit',
		),
		$dest
	);
	if ( is_wp_error( $id ) || ! $id ) {
		return 0;
	}

	wp_update_attachment_metadata( $id, wp_generate_attachment_metadata( $id, $dest ) );
	update_post_meta( $id, '_wp_attachment_image_alt', $title );
	return (int) $id;
}

$created  = array();
$updated  = array();
$errors   = array();
$images   = array();

foreach ( $catalog as $item ) {
	$sku = (string) $item['sku'];
	if ( '' === $sku ) {
		continue;
	}

	$existing_id = (int) wc_get_product_id_by_sku( $sku );
	$is_new      = 0 === $existing_id;
	$product     = $is_new ? new WC_Product_Simple() : wc_get_product( $existing_id );

	if ( ! $product instanceof WC_Product ) {
		$errors[] = array( 'sku' => $sku, 'error' => 'Produk tidak bisa dibuka.' );
		continue;
	}

	$product->set_name( (string) $item['name'] );
	$product->set_sku( $sku );
	$product->set_status( 'publish' );
	$product->set_catalog_visibility( 'visible' );
	$product->set_regular_price( (string) $item['regular_price'] );
	$product->set_sale_price( (string) ( $item['sale_price'] ?? '' ) );
	$product->set_short_description( (string) $item['short_description'] );
	$product->set_description( (string) $item['description'] );
	$product->set_manage_stock( true );
	$product->set_stock_quantity( (int) ( $item['stock'] ?? 25 ) );
	$product->set_stock_status( 'instock' );

	$category_ids = dnd_ensure_categories( (array) $item['categories'] );
	if ( $category_ids ) {
		$product->set_category_ids( $category_ids );
	}

	$image_id = dnd_attach_image( $stage_dir, (string) $item['image'], (string) $item['name'] );
	if ( $image_id ) {
		$product->set_image_id( $image_id );
		$images[] = $item['image'];
	}

	$saved = $product->save();
	if ( ! $saved ) {
		$errors[] = array( 'sku' => $sku, 'error' => 'Gagal menyimpan.' );
		continue;
	}

	if ( $is_new ) {
		$created[] = array( 'sku' => $sku, 'id' => $saved );
	} else {
		$updated[] = array( 'sku' => $sku, 'id' => $saved );
	}
}

// Tag "New" untuk produk yang ditandai, supaya bisa dipakai filter katalog.
$new_tag = get_term_by( 'name', 'New', 'product_tag' );
if ( ! $new_tag instanceof WP_Term ) {
	$made = wp_insert_term( 'New', 'product_tag' );
	if ( ! is_wp_error( $made ) ) {
		$new_tag = get_term( (int) $made['term_id'], 'product_tag' );
	}
}
$tagged = 0;
if ( $new_tag instanceof WP_Term ) {
	foreach ( $catalog as $item ) {
		if ( ! in_array( 'New', (array) ( $item['tags'] ?? array() ), true ) ) {
			continue;
		}
		$pid = (int) wc_get_product_id_by_sku( (string) $item['sku'] );
		if ( $pid ) {
			wp_set_object_terms( $pid, array( (int) $new_tag->term_id ), 'product_tag', false );
			$tagged++;
		}
	}
}

$term_counts = get_terms(
	array( 'taxonomy' => 'product_cat', 'hide_empty' => false, 'fields' => 'id=>count' )
);

echo dnd_json(
	array(
		'ok'            => true,
		'created'       => count( $created ),
		'updated'       => count( $updated ),
		'images_set'    => count( $images ),
		'tagged_new'    => $tagged,
		'errors'        => $errors,
		'product_total' => (int) wp_count_posts( 'product' )->publish,
		'empty_cats'    => array_values(
			array_filter(
				(array) $term_counts,
				static function ( $count ): bool {
					return 0 === (int) $count;
				}
			)
		),
	)
);

$cleanup();
