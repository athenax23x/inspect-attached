<?php
/**
 * Product card in WooCommerce loops.
 *
 * @package Dirt and Dawn
 */

defined( 'ABSPATH' ) || exit;

global $product;

if ( empty( $product ) || ! $product->is_visible() ) {
	return;
}

dirt_dawn_product_card( $product );
