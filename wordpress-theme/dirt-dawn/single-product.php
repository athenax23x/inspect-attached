<?php
/**
 * Single product page.
 *
 * Wraps WooCommerce's own single-product markup (woocommerce_content keeps the
 * default hooks, gallery, variations and add-to-cart forms) in the storefront
 * layout.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<div class="container-x dnd-single-product">
	<?php woocommerce_content(); ?>
</div>

<?php
get_footer();
