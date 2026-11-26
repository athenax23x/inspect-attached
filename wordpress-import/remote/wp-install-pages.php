<?php
/**
 * Installer sekali pakai: buat halaman WordPress yang belum ada.
 *
 * Dipanggil via HTTP dengan ?token=... yang harus sama dengan isi file token
 * di sebelahnya. Hanya MENAMBAH halaman yang slug-nya belum ada; tidak pernah
 * mengubah atau menghapus konten yang sudah ada. Menghapus dirinya sendiri,
 * file token, dan file JSON setelah selesai.
 *
 * @package DirtAndDawn
 */

declare( strict_types = 1 );

header( 'Content-Type: application/json; charset=utf-8' );
header( 'X-Robots-Tag: noindex, nofollow' );

$dir        = __DIR__;
$token_file = $dir . '/wp-install-token.txt';
$data_file  = $dir . '/wp-install-pages.json';

$cleanup = static function () use ( $token_file, $data_file ): void {
	@unlink( __FILE__ ); // phpcs:ignore WordPress.PHP.NoSilencedErrors
	@unlink( $token_file ); // phpcs:ignore WordPress.PHP.NoSilencedErrors
	@unlink( $data_file ); // phpcs:ignore WordPress.PHP.NoSilencedErrors
};

$fail = static function ( string $message, int $code ) use ( $cleanup ): void {
	http_response_code( $code );
	echo wp_json_encode_plain( array( 'ok' => false, 'error' => $message ) );
	$cleanup();
	exit;
};

function wp_json_encode_plain( array $payload ): string {
	return (string) json_encode( $payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES );
}

if ( ! is_readable( $token_file ) || ! is_readable( $data_file ) ) {
	$fail( 'File token atau JSON tidak ditemukan.', 500 );
}

$expected = trim( (string) file_get_contents( $token_file ) );
$given    = isset( $_GET['token'] ) ? (string) $_GET['token'] : '';

if ( '' === $expected || ! hash_equals( $expected, $given ) ) {
	// Jangan hapus apa pun di sini supaya token salah tidak mematikan installer.
	http_response_code( 403 );
	echo wp_json_encode_plain( array( 'ok' => false, 'error' => 'Token salah.' ) );
	exit;
}

$pages = json_decode( (string) file_get_contents( $data_file ), true );
if ( ! is_array( $pages ) ) {
	$fail( 'JSON halaman tidak valid.', 500 );
}

require_once $dir . '/wp-load.php';

$created = array();
$updated = array();
$skipped = array();
$ids     = array();

foreach ( $pages as $page ) {
	$slug  = (string) $page['slug'];
	$title = (string) $page['title'];
	$body  = (string) $page['content'];

	$existing = get_page_by_path( $slug, OBJECT, 'page' );
	if ( ! $existing instanceof WP_Post ) {
		// Hormati alias (mis. 'about' untuk halaman Story): jangan buat duplikat.
		foreach ( (array) ( $page['aliases'] ?? array() ) as $alias ) {
			$aliased = get_page_by_path( (string) $alias, OBJECT, 'page' );
			if ( $aliased instanceof WP_Post ) {
				$existing = $aliased;
				break;
			}
		}
	}

	if ( $existing instanceof WP_Post ) {
		$ids[ $slug ] = $existing->ID;
		$actions      = array();

		// Terbitkan halaman yang masih draft/private supaya bisa diakses publik.
		if ( 'publish' !== $existing->post_status ) {
			wp_update_post(
				array(
					'ID'          => $existing->ID,
					'post_status' => 'publish',
				)
			);
			$actions[] = 'published:' . $existing->post_status;
		}

		// Isi konten hanya kalau memang kosong; konten yang sudah ada tidak disentuh.
		if ( '' !== $body && '' === trim( (string) $existing->post_content ) ) {
			wp_update_post(
				array(
					'ID'           => $existing->ID,
					'post_content' => $body,
				)
			);
			$actions[] = 'content_installed';
		}

		if ( $actions ) {
			$updated[] = array( 'slug' => $slug, 'id' => $existing->ID, 'actions' => $actions );
		} else {
			$skipped[] = array( 'slug' => $slug, 'id' => $existing->ID );
		}
		continue;
	}

	$id = wp_insert_post(
		array(
			'post_title'   => $title,
			'post_name'    => $slug,
			'post_content' => $body,
			'post_status'  => 'publish',
			'post_type'    => 'page',
		),
		true
	);

	if ( is_wp_error( $id ) ) {
		$created[] = array( 'slug' => $slug, 'error' => $id->get_error_message() );
		continue;
	}

	$created[]    = array( 'slug' => $slug, 'id' => $id );
	$ids[ $slug ] = $id;
}

// Homepage statis: hanya diatur kalau belum pernah diatur.
$home_changed = false;
if ( isset( $ids['home'] ) && (int) get_option( 'page_on_front' ) === 0 ) {
	update_option( 'show_on_front', 'page' );
	update_option( 'page_on_front', (int) $ids['home'] );
	$home_changed = true;
}

echo wp_json_encode_plain(
	array(
		'ok'              => true,
		'created'         => $created,
		'updated'         => $updated,
		'skipped'         => $skipped,
		'page_on_front'   => (int) get_option( 'page_on_front' ),
		'homepage_change' => $home_changed,
		'permalink'       => (string) get_option( 'permalink_structure' ),
	)
);

$cleanup();
