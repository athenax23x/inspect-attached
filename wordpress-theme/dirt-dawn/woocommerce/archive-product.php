<?php
/**
 * Shop and product-category archive.
 *
 * Keeps WooCommerce's ordering, notices, pagination and hooks; the layout and
 * header band follow the storefront design.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$eyebrow = is_search() ? __( 'Search', 'dirt-dawn' ) : __( 'Shop', 'dirt-dawn' );
?>

<div class="container-x">
	<?php woocommerce_output_all_notices(); ?>
	<header class="dnd-shop-head">
		<p class="eyebrow"><?php echo esc_html( $eyebrow ); ?></p>
		<h1><?php woocommerce_page_title(); ?></h1>
		<?php do_action( 'woocommerce_archive_description' ); ?>
	</header>

	<?php if ( woocommerce_product_loop() ) : ?>
		<div class="woocommerce-toolbar">
			<?php
			woocommerce_result_count();
			woocommerce_catalog_ordering();
			?>
		</div>

		<div class="dnd-shop-main">
			<?php
			woocommerce_product_loop_start();

			if ( wc_get_loop_prop( 'total' ) ) {
				while ( have_posts() ) {
					the_post();
					do_action( 'woocommerce_shop_loop' );
					wc_get_template_part( 'content', 'product' );
				}
			}

			woocommerce_product_loop_end();
			do_action( 'woocommerce_after_shop_loop' );
			?>
		</div>
	<?php else : ?>
		<div class="dnd-empty-shop">
			<h2><?php esc_html_e( 'No products match this view', 'dirt-dawn' ); ?></h2>
			<p><?php esc_html_e( 'The full range is still one click away.', 'dirt-dawn' ); ?></p>
			<a class="btn-primary" href="<?php echo esc_url( dirt_dawn_shop_url() ); ?>"><?php esc_html_e( 'Shop all gear', 'dirt-dawn' ); ?></a>
		</div>
	<?php endif; ?>
</div>

<?php
get_footer();
