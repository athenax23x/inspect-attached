<?php
declare( strict_types = 1 );

/**
 * Dirt & Dawn theme functions.
 *
 * All storefront content comes from WordPress / WooCommerce (products,
 * categories, pages); the theme only supplies layout, type and copy that is
 * part of the brand itself.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const DIRT_DAWN_VERSION = '2.0.0';

/**
 * Contact address used by the newsletter band and the footer.
 */
function dirt_dawn_contact_email(): string {
	return (string) apply_filters( 'dirt_dawn_contact_email', 'dirtndawn@hotmail.com' );
}

/**
 * Gelombang merek kartu pembayaran, ditulis sebagai SVG inline supaya
 * warnanya asli tanpa permintaan berkas tambahan.
 */
function dirt_dawn_payment_card( string $brand ): string {
	$common = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 36" width="56" height="36" focusable="false" aria-hidden="true">';

	switch ( $brand ) {
		case 'visa':
			$label = 'Visa';
			$body  = '<rect width="56" height="36" rx="4" fill="#ffffff"/>'
				. '<text x="28" y="24" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" font-style="italic" letter-spacing="0.5" fill="#1a1f71">VISA</text>';
			break;

		case 'mastercard':
			$label = 'Mastercard';
			$body  = '<rect width="56" height="36" rx="4" fill="#ffffff"/>'
				. '<circle cx="23" cy="18" r="9.5" fill="#eb001b"/>'
				. '<circle cx="33" cy="18" r="9.5" fill="#f79e1b"/>'
				. '<path d="M28 10.4a9.5 9.5 0 000 15.2 9.5 9.5 0 000-15.2z" fill="#ff5f00"/>';
			break;

		case 'amex':
			$label = 'American Express';
			$body  = '<rect width="56" height="36" rx="4" fill="#2e77bc"/>'
				. '<text x="28" y="22" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5" fill="#ffffff">AMEX</text>';
			break;

		case 'paypal':
			$label = 'PayPal';
			$body  = '<rect width="56" height="36" rx="4" fill="#ffffff"/>'
				. '<text x="28" y="23" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="700" font-style="italic">'
				. '<tspan fill="#003087">Pay</tspan><tspan fill="#009cde">Pal</tspan></text>';
			break;

		default:
			return '';
	}

	return $common . $body . '</svg>';
}

/**
 * Baris kartu pembayaran untuk footer.
 */
function dirt_dawn_payment_cards(): string {
	$brands = (array) apply_filters( 'dirt_dawn_payment_brands', array( 'visa', 'mastercard', 'amex', 'paypal' ) );
	$out    = '';
	foreach ( $brands as $brand ) {
		$card = dirt_dawn_payment_card( (string) $brand );
		if ( '' === $card ) {
			continue;
		}
		$out .= '<span class="dnd-pay__card">' . $card . '</span>';
	}
	return $out;
}

/**
 * Logo merek di header: logo situs kalau diatur, kalau tidak pakai berkas
 * bawaan tema, dan kalau itu pun tidak ada, wordmark teks.
 */
function dirt_dawn_header_logo(): string {
	if ( function_exists( 'has_custom_logo' ) && has_custom_logo() ) {
		$id = (int) get_theme_mod( 'custom_logo' );
		return wp_get_attachment_image(
			$id,
			'full',
			false,
			array(
				'class' => 'dnd-logo',
				'alt'   => get_bloginfo( 'name' ),
			)
		);
	}

	$file = get_theme_file_path( 'assets/logo.svg' );
	if ( file_exists( $file ) ) {
		return sprintf(
			'<img class="dnd-logo" src="%s" alt="%s" width="260" height="52" decoding="async">',
			esc_url( get_theme_file_uri( 'assets/logo.svg' ) ),
			esc_attr( get_bloginfo( 'name' ) )
		);
	}

	return '';
}

/**
 * Berkas logo bawaan, dipakai installer untuk mengisi Site Logo WordPress.
 */
function dirt_dawn_bundled_logo_path(): string {
	return get_theme_file_path( 'assets/logo.svg' );
}

/**
 * Ikon tab (favicon) cadangan.
 *
 * WordPress hanya mencetak <link rel="icon"> kalau Site Icon diatur dan
 * ukurannya bisa diresolusi. Kalau belum, tema memakai ikon bawaannya supaya
 * tab browser tidak menampilkan ikon bawaan server.
 */
function dirt_dawn_site_icon_fallback(): void {
	if ( get_site_icon_url( 512 ) ) {
		return; // WordPress sudah menangani.
	}
	$icon = get_theme_file_uri( 'assets/icon-512.png' );
	printf( '<link rel="icon" type="image/png" sizes="512x512" href="%s">' . "\n", esc_url( $icon ) );
	printf( '<link rel="apple-touch-icon" href="%s">' . "\n", esc_url( $icon ) );
}
add_action( 'wp_head', 'dirt_dawn_site_icon_fallback', 20 );

function dirt_dawn_setup(): void {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'custom-logo', array(
		'height'      => 64,
		'width'       => 240,
		'flex-height' => true,
		'flex-width'  => true,
	) );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'woocommerce', array(
		'thumbnail_image_width' => 700,
		'single_image_width'    => 1000,
		'product_grid'          => array(
			'default_rows'    => 3,
			'min_rows'        => 1,
			'default_columns' => 4,
			'min_columns'     => 2,
			'max_columns'     => 4,
		),
	) );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );

	register_nav_menus( array(
		'primary'   => __( 'Primary menu', 'dirt-dawn' ),
		'footer'    => __( 'Footer menu', 'dirt-dawn' ),
	) );
}
add_action( 'after_setup_theme', 'dirt_dawn_setup' );

/**
 * Styles and scripts. Fonts are bundled in assets/fonts (no CDN request).
 */
function dirt_dawn_assets(): void {
	wp_enqueue_style( 'dirt-dawn', get_stylesheet_uri(), array(), dirt_dawn_asset_version( 'style.css' ) );
	wp_enqueue_script( 'dirt-dawn', get_theme_file_uri( 'assets/js/theme.js' ), array(), dirt_dawn_asset_version( 'assets/js/theme.js' ), true );

	wp_localize_script( 'dirt-dawn', 'dirtDawn', array(
		'email'  => dirt_dawn_contact_email(),
		'i18n'   => array(
			'invalidEmail' => __( 'Please enter a valid email address.', 'dirt-dawn' ),
			'openMenu'     => __( 'Open menu', 'dirt-dawn' ),
			'closeMenu'    => __( 'Close menu', 'dirt-dawn' ),
		),
	) );
}
add_action( 'wp_enqueue_scripts', 'dirt_dawn_assets' );

/**
 * Versi aset diambil dari waktu modifikasi berkas, bukan konstanta tema.
 *
 * Sebelumnya versi aset dipatok pada konstanta, jadi URL seperti
 * `style.css?ver=2.0.0` tidak pernah berubah dan CDN/browser terus menyajikan
 * berkas lama setelah CSS diperbarui. Dengan filemtime, setiap deploy otomatis
 * membatalkan cache.
 */
function dirt_dawn_asset_version( string $relative ): string {
	$path = get_theme_file_path( $relative );
	return file_exists( $path ) ? (string) filemtime( $path ) : DIRT_DAWN_VERSION;
}

function dirt_dawn_preload_fonts(): void {
	$fonts = array( 'fraunces-latin.woff2', 'archivo-latin.woff2' );
	foreach ( $fonts as $font ) {
		printf(
			'<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n",
			esc_url( get_theme_file_uri( 'assets/fonts/' . $font ) )
		);
	}
}
add_action( 'wp_head', 'dirt_dawn_preload_fonts', 1 );

function dirt_dawn_body_classes( array $classes ): array {
	$classes[] = 'dnd';
	if ( is_front_page() ) {
		$classes[] = 'dnd-home';
	}
	return $classes;
}
add_filter( 'body_class', 'dirt_dawn_body_classes' );

/**
 * Content width for embeds and images.
 */
function dirt_dawn_content_width(): void {
	$GLOBALS['content_width'] = 1280;
}
add_action( 'after_setup_theme', 'dirt_dawn_content_width', 0 );

/* -------------------------------------------------------------------------
 * Icons — one stroke family, 19px utility / 24px inline.
 * ---------------------------------------------------------------------- */
function dirt_dawn_icon( string $name ): string {
	$open = '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">';

	$paths = array(
		'search'  => '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>',
		'account' => '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
		'wishlist' => '<path d="M12 21s-8-5.5-8-11a4.5 4.5 0 018-3 4.5 4.5 0 018 3c0 5.5-8 11-8 11z"/>',
		'cart'    => '<path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 016 0"/>',
		'menu'    => '<path d="M3 6h18M3 12h18M3 18h18"/>',
		'close'   => '<path d="M5 5l14 14M19 5L5 19"/>',
		'cart-bag' => '<path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 016 0"/>',
	);

	if ( ! isset( $paths[ $name ] ) ) {
		return '';
	}

	return $open . $paths[ $name ] . '</svg>';
}

function dirt_dawn_chevron(): string {
	return '<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><path d="M1 1l3.5 4L8 1"/></svg>';
}

/* -------------------------------------------------------------------------
 * Store URLs and lookups — everything resolves against real site data.
 * ---------------------------------------------------------------------- */
function dirt_dawn_shop_url(): string {
	if ( function_exists( 'wc_get_page_permalink' ) ) {
		$url = wc_get_page_permalink( 'shop' );
		if ( $url ) {
			return $url;
		}
	}
	return home_url( '/shop/' );
}

function dirt_dawn_cart_url(): string {
	if ( function_exists( 'wc_get_cart_url' ) ) {
		return wc_get_cart_url();
	}
	return home_url( '/cart/' );
}

function dirt_dawn_account_url(): string {
	if ( function_exists( 'wc_get_page_permalink' ) ) {
		$url = wc_get_page_permalink( 'myaccount' );
		if ( $url ) {
			return $url;
		}
	}
	return wp_login_url();
}

function dirt_dawn_cart_count(): int {
	if ( function_exists( 'WC' ) && WC()->cart ) {
		return (int) WC()->cart->get_cart_contents_count();
	}
	return 0;
}

/**
 * A page URL by slug, or '' when the page does not exist.
 */
function dirt_dawn_page_url( string ...$slugs ): string {
	foreach ( $slugs as $slug ) {
		$page = get_page_by_path( $slug );
		if ( $page instanceof WP_Post && 'publish' === $page->post_status ) {
			return (string) get_permalink( $page );
		}
	}
	return '';
}

/**
 * Product count for a category including its children — WooCommerce stores
 * each product against the leaf category, so a parent can report 0.
 */
function dirt_dawn_category_product_count( WP_Term $term ): int {
	$count    = (int) $term->count;
	$children = get_term_children( $term->term_id, 'product_cat' );
	if ( is_array( $children ) ) {
		foreach ( $children as $child_id ) {
			$child = get_term( (int) $child_id, 'product_cat' );
			if ( $child instanceof WP_Term ) {
				$count += (int) $child->count;
			}
		}
	}
	return $count;
}

/**
 * Ordered product categories that actually contain products.
 *
 * @return WP_Term[]
 */
function dirt_dawn_product_categories( int $limit = 0 ): array {
	if ( ! taxonomy_exists( 'product_cat' ) || ! function_exists( 'get_terms' ) ) {
		return array();
	}

	$terms = get_terms( array(
		'taxonomy'   => 'product_cat',
		'parent'     => 0,
		'orderby'    => 'name',
		'order'      => 'ASC',
		'hide_empty' => false,
	) );

	if ( is_wp_error( $terms ) || empty( $terms ) ) {
		return array();
	}

	$default_id = (int) get_option( 'default_product_cat', 0 );
	$preferred  = array( 'apparel', 'equipment', 'electronics', 'lighting', 'nutrition', 'recovery', 'accessories' );

	$live = array();
	foreach ( $terms as $term ) {
		if ( (int) $term->term_id === $default_id ) {
			continue;
		}
		if ( dirt_dawn_category_product_count( $term ) > 0 ) {
			$live[] = $term;
		}
	}

	$ordered = array();
	foreach ( $preferred as $slug ) {
		foreach ( $live as $term ) {
			if ( $term->slug === $slug ) {
				$ordered[] = $term;
				break;
			}
		}
	}
	foreach ( $live as $term ) {
		if ( ! in_array( $term->slug, $preferred, true ) ) {
			$ordered[] = $term;
		}
	}

	if ( $limit > 0 ) {
		$ordered = array_slice( $ordered, 0, $limit );
	}

	return $ordered;
}

function dirt_dawn_category_blurbs(): array {
	return array(
		'shoes'       => __( 'Trail, road & race-day', 'dirt-dawn' ),
		'apparel'     => __( 'Tees, shorts, jackets & layers', 'dirt-dawn' ),
		'equipment'   => __( 'Packs, vests & hydration', 'dirt-dawn' ),
		'electronics' => __( 'GPS watches & heart rate', 'dirt-dawn' ),
		'lighting'    => __( 'Headlamps & visibility', 'dirt-dawn' ),
		'nutrition'   => __( 'Gels, bars & electrolytes', 'dirt-dawn' ),
		'recovery'    => __( 'Rollers & massage', 'dirt-dawn' ),
		'accessories' => __( 'Headwear, eyewear & gloves', 'dirt-dawn' ),
	);
}

/**
 * Category blurb: the taxonomy description when the store owner wrote one,
 * otherwise the brand's one-line category summary.
 */
function dirt_dawn_category_blurb( WP_Term $term ): string {
	$description = trim( wp_strip_all_tags( (string) $term->description ) );
	if ( '' !== $description ) {
		return wp_trim_words( $description, 8, '…' );
	}
	$blurbs = dirt_dawn_category_blurbs();
	return $blurbs[ $term->slug ] ?? '';
}

/**
 * Category tile image: WooCommerce category image first, bundled photo second.
 */
function dirt_dawn_category_image( WP_Term $term, string $size = 'woocommerce_thumbnail' ): string {
	$thumbnail_id = (int) get_term_meta( $term->term_id, 'thumbnail_id', true );
	if ( $thumbnail_id > 0 ) {
		$url = wp_get_attachment_image_url( $thumbnail_id, $size );
		if ( $url ) {
			return (string) $url;
		}
	}

	// Foto kategori dari Burst (lihat assets/img/PHOTO-CREDITS.md). Setiap
	// kategori induk memakai foto yang memang menampilkan barangnya.
	$map = array(
		'apparel'     => 'cat-apparel.jpg',
		'equipment'   => 'cat-equipment.jpg',
		'electronics' => 'cat-electronics.jpg',
		'recovery'    => 'cat-recovery.jpg',
		'accessories' => 'cat-accessories.jpg',
		'footwear'    => 'cat-footwear.jpg',
		'shoes'       => 'cat-footwear.jpg',
	);
	$file = $map[ $term->slug ] ?? '';
	if ( '' !== $file && file_exists( get_theme_file_path( 'assets/img/' . $file ) ) ) {
		return (string) get_theme_file_uri( 'assets/img/' . $file );
	}

	return '';
}

function dirt_dawn_category_link( string $slug ): string {
	if ( taxonomy_exists( 'product_cat' ) ) {
		$term = get_term_by( 'slug', $slug, 'product_cat' );
		if ( $term instanceof WP_Term && dirt_dawn_category_product_count( $term ) > 0 ) {
			return (string) get_term_link( $term );
		}
	}
	return '';
}

function dirt_dawn_sale_url(): string {
	return add_query_arg( 'on_sale', '1', dirt_dawn_shop_url() );
}

function dirt_dawn_new_arrivals_url(): string {
	return add_query_arg( 'orderby', 'date', dirt_dawn_shop_url() );
}

function dirt_dawn_story_url(): string {
	return dirt_dawn_page_url( 'story', 'our-story', 'about' );
}

/* -------------------------------------------------------------------------
 * Mega-menu sources — curated labels, real destinations.
 * ---------------------------------------------------------------------- */
function dirt_dawn_shop_menu(): array {
	$items = array(
		array(
			'label' => __( 'Shop All', 'dirt-dawn' ),
			'url'   => dirt_dawn_shop_url(),
			'blurb' => __( 'Everything, in one place', 'dirt-dawn' ),
		),
	);

	$curated = array(
		'apparel'     => array( __( 'Running Apparel', 'dirt-dawn' ), __( 'Tees, shorts & shells', 'dirt-dawn' ) ),
		'equipment'   => array( __( 'Hydration & Trail Gear', 'dirt-dawn' ), __( 'Race vests, packs & poles', 'dirt-dawn' ) ),
		'electronics' => array( __( 'Tracking & Navigation', 'dirt-dawn' ), __( 'GPS watches & heart rate', 'dirt-dawn' ) ),
		'lighting'    => array( __( 'Lighting & Visibility', 'dirt-dawn' ), __( 'Headlamps & reflective', 'dirt-dawn' ) ),
		'nutrition'   => array( __( 'Nutrition & Fuel', 'dirt-dawn' ), __( 'Gels & electrolytes', 'dirt-dawn' ) ),
		'recovery'    => array( __( 'Recovery & Training', 'dirt-dawn' ), __( 'Rollers & massage', 'dirt-dawn' ) ),
		'accessories' => array( __( 'Running Accessories', 'dirt-dawn' ), __( 'Headwear, eyewear & socks', 'dirt-dawn' ) ),
	);

	foreach ( $curated as $slug => $copy ) {
		$url = dirt_dawn_category_link( $slug );
		if ( '' === $url ) {
			continue;
		}
		$items[] = array(
			'label' => $copy[0],
			'url'   => $url,
			'blurb' => $copy[1],
		);
	}

	// Any remaining category with products still gets a home in the menu.
	$used  = array_keys( $curated );
	foreach ( dirt_dawn_product_categories() as $term ) {
		if ( in_array( $term->slug, $used, true ) ) {
			continue;
		}
		$items[] = array(
			'label' => $term->name,
			'url'   => (string) get_term_link( $term ),
			'blurb' => dirt_dawn_category_blurb( $term ),
		);
	}

	return $items;
}

function dirt_dawn_activities_menu(): array {
	$pairs = array(
		__( 'Road Running', 'dirt-dawn' )     => 'apparel',
		__( 'Trail Running', 'dirt-dawn' )    => 'equipment',
		__( 'Trekking', 'dirt-dawn' )         => 'equipment',
		__( 'Outdoor Training', 'dirt-dawn' ) => 'recovery',
	);
	$items = array();
	foreach ( $pairs as $label => $slug ) {
		$url = dirt_dawn_category_link( $slug );
		if ( '' !== $url ) {
			$items[] = array( 'label' => $label, 'url' => $url );
		}
	}
	return $items;
}

function dirt_dawn_collections_menu(): array {
	return array(
		array( 'label' => __( 'New Arrivals', 'dirt-dawn' ), 'url' => dirt_dawn_new_arrivals_url() ),
		array( 'label' => __( 'Sale', 'dirt-dawn' ), 'url' => dirt_dawn_sale_url() ),
	);
}

/* -------------------------------------------------------------------------
 * WooCommerce integration
 * ---------------------------------------------------------------------- */
function dirt_dawn_products_per_page(): int {
	return 12;
}
add_filter( 'loop_shop_per_page', 'dirt_dawn_products_per_page', 20 );

function dirt_dawn_loop_columns(): int {
	return 4;
}
add_filter( 'loop_shop_columns', 'dirt_dawn_loop_columns', 20 );

/**
 * Products for the home page sections — real catalogue queries only.
 *
 * @return WC_Product[]
 */
function dirt_dawn_products( array $args ): array {
	if ( ! function_exists( 'wc_get_products' ) ) {
		return array();
	}
	$args = wp_parse_args( $args, array(
		'status'  => 'publish',
		'limit'   => 4,
		'orderby' => 'date',
		'order'   => 'DESC',
	) );
	$products = wc_get_products( $args );
	return is_array( $products ) ? $products : array();
}

/**
 * Honour ?on_sale=1 on the shop and category archives (used by the Sale links).
 */
function dirt_dawn_on_sale_archive( WP_Query $query ): void {
	if ( is_admin() || ! $query->is_main_query() ) {
		return;
	}
	if ( empty( $_GET['on_sale'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return;
	}
	$is_catalog = ( function_exists( 'is_shop' ) && is_shop() )
		|| ( function_exists( 'is_product_taxonomy' ) && is_product_taxonomy() );
	if ( ! $is_catalog || ! function_exists( 'wc_get_product_ids_on_sale' ) ) {
		return;
	}
	$sale_ids = wc_get_product_ids_on_sale();
	$query->set( 'post__in', ! empty( $sale_ids ) ? $sale_ids : array( 0 ) );
}
add_action( 'pre_get_posts', 'dirt_dawn_on_sale_archive' );

/**
 * Keep the header cart badge in step with WooCommerce AJAX add-to-cart.
 */
function dirt_dawn_cart_count_fragment( array $fragments ): array {
	$count = dirt_dawn_cart_count();
	$fragments['.dnd-cart-count'] = '<span class="dnd-util__badge dnd-cart-count"' . ( $count ? '' : ' hidden' ) . '>' . esc_html( (string) $count ) . '</span>';
	return $fragments;
}
add_filter( 'woocommerce_add_to_cart_fragments', 'dirt_dawn_cart_count_fragment' );

/**
 * Remove the default Woo wrappers' page title; the theme prints its own header.
 */
add_filter( 'woocommerce_show_page_title', '__return_false' );

/**
 * The storefront has no widget sidebar (the preview has none either).
 */
remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10 );

/**
 * Card sub-label: first product category.
 */
function dirt_dawn_card_category( WC_Product $product ): string {
	$terms = get_the_terms( $product->get_id(), 'product_cat' );
	if ( is_array( $terms ) && ! empty( $terms ) ) {
		$default_id = (int) get_option( 'default_product_cat', 0 );
		foreach ( $terms as $term ) {
			if ( (int) $term->term_id !== $default_id ) {
				return $term->name;
			}
		}
	}
	return '';
}

/**
 * Product card markup — used by the home page sections and by the WooCommerce
 * loop (templates are in woocommerce/content-product.php).
 */
function dirt_dawn_product_card( WC_Product $product ): void {
	$permalink = get_permalink( $product->get_id() );
	$category  = dirt_dawn_card_category( $product );
	$is_new    = dirt_dawn_is_new( $product );
	$classes   = array( 'dnd-card', 'product' );
	if ( function_exists( 'wc_get_product_class' ) ) {
		$classes = array_merge( wc_get_product_class( '', $product ), array( 'dnd-card' ) );
	}
	?>
	<li class="<?php echo esc_attr( implode( ' ', array_unique( $classes ) ) ); ?>">
		<div class="dnd-card__media">
			<a href="<?php echo esc_url( $permalink ); ?>" aria-label="<?php echo esc_attr( $product->get_name() ); ?>">
				<?php echo $product->get_image( 'woocommerce_thumbnail', array( 'loading' => 'lazy' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
			<?php if ( $is_new || $product->is_on_sale() ) : ?>
				<div class="dnd-card__badges">
					<?php if ( $is_new ) : ?>
						<span class="dnd-badge"><?php esc_html_e( 'New', 'dirt-dawn' ); ?></span>
					<?php endif; ?>
					<?php if ( $product->is_on_sale() ) : ?>
						<span class="dnd-badge dnd-badge--sale"><?php esc_html_e( 'Sale', 'dirt-dawn' ); ?></span>
					<?php endif; ?>
				</div>
			<?php endif; ?>
			<?php if ( $product->is_type( 'simple' ) && $product->is_purchasable() && $product->is_in_stock() ) : ?>
				<div class="dnd-card__quick"><?php woocommerce_template_loop_add_to_cart(); ?></div>
			<?php endif; ?>
		</div>
		<div class="dnd-card__body">
			<div>
				<a class="dnd-card__name" href="<?php echo esc_url( $permalink ); ?>"><?php echo esc_html( $product->get_name() ); ?></a>
				<?php if ( '' !== $category ) : ?>
					<p class="dnd-card__sub"><?php echo esc_html( $category ); ?></p>
				<?php endif; ?>
			</div>
			<div class="dnd-card__price"><?php echo $product->get_price_html(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
		</div>
	</li>
	<?php
}

function dirt_dawn_is_new( WC_Product $product, int $days = 30 ): bool {
	$created = $product->get_date_created();
	if ( ! $created ) {
		return false;
	}
	return ( time() - $created->getTimestamp() ) < ( $days * DAY_IN_SECONDS );
}

/**
 * One-time automatic removal of the old static Next.js store leftovers in
 * public_html (they shadow WordPress URLs such as /shop and /cart). Runs on
 * the first page load after deploy, deletes only the fixed list below —
 * never wp-admin, wp-content, wp-includes, wp-*.php, index.php, .htaccess —
 * then records the result so it does not run again. If a deletion fails
 * (permissions), it retries on the next load instead of giving up.
 */
function dirt_dawn_delete_static_leftovers( string $root ): array {
	$dirs = array(
		'_next',
		'_not-found',
		'shop',
		'product',
		'policies',
		'cart',
		'checkout',
		'account',
		'admin',
		'order',
		'story',
		'wishlist',
		'contact',
		'icons',
		'stock',
		'terms-and-conditions',
		'privacy-policy',
		'shipping-and-delivery',
		'returns-and-refunds',
		'cancellation-policy',
		'cookie-policy',
		'payment-policy',
		'warranty-policy',
	);
	$files = array(
		'404.html',
		'422.html',
		'500.html',
		'shop.html',
		'index.html',
		'sitemap.xml',
	);

	$report = array();
	$base   = rtrim( $root, '/' );
	foreach ( $dirs as $d ) {
		$path = $base . '/' . $d;
		if ( file_exists( $path ) ) {
			$report[] = ( dirt_dawn_rrmdir( $path ) ? 'DELETED DIR ' : 'FAILED DIR  ' ) . '/' . $d;
		}
	}
	foreach ( $files as $f ) {
		$path = $base . '/' . $f;
		if ( file_exists( $path ) ) {
			$report[] = ( @unlink( $path ) ? 'DELETED FILE' : 'FAILED FILE ' ) . ' /' . $f;
		}
	}
	return $report;
}

function dirt_dawn_rrmdir( string $dir ): bool {
	if ( ! is_dir( $dir ) ) {
		return false;
	}
	$items = array_diff( scandir( $dir ), array( '.', '..' ) );
	foreach ( $items as $item ) {
		$path = $dir . '/' . $item;
		if ( is_dir( $path ) ) {
			dirt_dawn_rrmdir( $path );
		} else {
			@unlink( $path );
		}
	}
	return @rmdir( $dir );
}

function dirt_dawn_autocleanup_static_leftovers(): void {
	if ( get_option( 'dirt_dawn_static_cleanup_done' ) ) {
		return;
	}
	$root = ABSPATH;
	if ( ! file_exists( $root . 'wp-login.php' ) && ! file_exists( $root . 'wp-settings.php' ) ) {
		// Not a WordPress root — do not delete anything, and do not retry.
		update_option( 'dirt_dawn_static_cleanup_done', 'aborted: not a WordPress root' );
		return;
	}
	$report = dirt_dawn_delete_static_leftovers( $root );
	$failed = array_filter(
		$report,
		static function ( string $line ) {
			return 0 === strpos( $line, 'FAILED' );
		}
	);
	if ( $failed ) {
		// Leave the done-flag unset so the next page load retries the leftovers.
		update_option( 'dirt_dawn_static_cleanup_report', $report, false );
		return;
	}
	update_option( 'dirt_dawn_static_cleanup_report', $report, false );
	update_option( 'dirt_dawn_static_cleanup_done', 'done ' . gmdate( 'Y-m-d H:i:s' ) );
}
add_action( 'init', 'dirt_dawn_autocleanup_static_leftovers', 1 );
