<?php
declare( strict_types = 1 );

/**
 * Dirt & Dawn theme functions.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function dirt_dawn_setup(): void {
	add_theme_support( 'woocommerce', array(
		'thumbnail_image_width' => 600,
		'single_image_width'    => 1200,
		'product_grid'          => array( 'default_columns' => 4, 'default_rows' => 4 ),
	) );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
	register_nav_menus( array( 'primary' => __( 'Primary Menu', 'dirt-dawn' ) ) );
}
add_action( 'after_setup_theme', 'dirt_dawn_setup' );

function dirt_dawn_assets(): void {
	wp_enqueue_style( 'dirt-dawn', get_stylesheet_uri(), array(), '1.0.0' );
}
add_action( 'wp_enqueue_scripts', 'dirt_dawn_assets' );

function dirt_dawn_cart_count( string $icon = 'Cart' ): string {
	if ( ! function_exists( 'WC' ) || ! WC()->cart ) {
		return esc_html( $icon );
	}
	return sprintf(
		'%s <span class="count">%d</span>',
		esc_html( $icon ),
		WC()->cart->get_cart_contents_count()
	);
}

function dirt_dawn_footer_menu_fallback(): void {
	$links = array(
		'Shop All'            => '/shop/',
		'Terms &amp; Conditions' => '/terms-and-conditions/',
		'Privacy Policy'      => '/privacy-policy/',
		'Shipping &amp; Delivery' => '/shipping-and-delivery/',
		'Returns &amp; Refunds' => '/returns-and-refunds/',
		'Payment Policy'      => '/payment-policy/',
		'Cancellation Policy' => '/cancellation-policy/',
		'Warranty Policy'     => '/warranty-policy/',
		'Cookie Policy'       => '/cookie-policy/',
		'Contact'             => '/contact/',
	);
	echo '<ul>';
	foreach ( $links as $label => $url ) {
		printf( '<li><a href="%s">%s</a></li>', esc_url( home_url( $url ) ), wp_kses_post( $label ) );
	}
	echo '</ul>';
}
