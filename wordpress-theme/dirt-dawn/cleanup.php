<?php
/**
 * One-time cleanup: removes leftover files of the old static Next.js store
 * from public_html so WordPress/WooCommerce serves every URL.
 *
 * Usage: open /wp-content/themes/dirt-dawn/cleanup.php?key=<CLEANUP_KEY>&go=1
 * It deletes ONLY the fixed list below (never wp-admin, wp-content,
 * wp-includes, wp-*.php, index.php, .htaccess, license.txt, robots.txt),
 * prints what it did, and then deletes itself.
 */

if ( ! defined( 'CLEANUP_KEY' ) ) {
	define( 'CLEANUP_KEY', 'dd-7f3a91c2e5b84d06' );
}

if ( empty( $_GET['key'] ) || ! hash_equals( CLEANUP_KEY, (string) $_GET['key'] ) ) {
	http_response_code( 403 );
	exit( 'Forbidden.' );
}
if ( empty( $_GET['go'] ) ) {
	exit( 'Add &go=1 to run. Nothing was deleted yet.' );
}

$root = dirname( __DIR__, 3 ); // wp-content/themes/dirt-dawn -> public_html

// Old static-store folders relative to public_html.
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

// Old static-store loose files relative to public_html.
$files = array(
	'404.html',
	'422.html',
	'500.html',
	'shop.html',
	'index.html',
	'sitemap.xml',
);

header( 'Content-Type: text/plain; charset=utf-8' );

$report = array();

// Safety guard: refuse to run if the path does not look like a WordPress root.
if ( ! file_exists( $root . '/wp-login.php' ) && ! file_exists( $root . '/wp-settings.php' ) ) {
	exit( "ABORT: $root does not look like a WordPress root. Nothing deleted." );
}

foreach ( $dirs as $d ) {
	$path = $root . '/' . $d;
	if ( is_dir( $path ) ) {
		$report[] = rrmdir( $path ) ? "DELETED DIR  /$d" : "FAILED DIR   /$d (permissions)";
	} else {
		$report[] = "NOT FOUND    /$d";
	}
}

foreach ( $files as $f ) {
	$path = $root . '/' . $f;
	if ( is_file( $path ) ) {
		$report[] = @unlink( $path ) ? "DELETED FILE /$f" : "FAILED FILE  /$f (permissions)";
	} else {
		$report[] = "NOT FOUND    /$f";
	}
}

echo implode( "\n", $report ), "\n";
echo "\nDone. This script has deleted itself; no further action needed.\n";

@unlink( __FILE__ );

function rrmdir( $dir ) {
	if ( ! is_dir( $dir ) ) {
		return false;
	}
	$items = array_diff( scandir( $dir ), array( '.', '..' ) );
	foreach ( $items as $item ) {
		$path = $dir . '/' . $item;
		is_dir( $path ) ? rrmdir( $path ) : @unlink( $path );
	}
	return @rmdir( $dir );
}
