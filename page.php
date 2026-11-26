<?php
/**
 * Static pages: shop policies, contact and other editorial content.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();

	$parent_id   = wp_get_post_parent_id( get_the_ID() );
	$parent_name = $parent_id ? get_the_title( $parent_id ) : '';
	$eyebrow     = $parent_name ? $parent_name : __( 'Dirt and Dawn', 'dirt-dawn' );
	$is_woo_page = function_exists( 'is_cart' ) && ( is_cart() || is_checkout() || is_account_page() );
	?>
	<article <?php post_class( 'dnd-page' ); ?>>
		<header class="dnd-page-head">
			<div class="container-x dnd-page-head__inner">
				<p class="eyebrow"><?php echo esc_html( $eyebrow ); ?></p>
				<h1><?php the_title(); ?></h1>
			</div>
		</header>

		<?php if ( has_post_thumbnail() ) : ?>
			<div class="container-x dnd-page-hero">
				<?php the_post_thumbnail( 'large', array( 'loading' => 'lazy' ) ); ?>
			</div>
		<?php endif; ?>

		<div class="container-x dnd-entry<?php echo $is_woo_page ? ' dnd-entry--wide' : ''; ?>">
			<div class="<?php echo $is_woo_page ? 'dnd-woo-page' : 'dnd-prose'; ?>">
				<?php
				the_content();
				wp_link_pages( array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'dirt-dawn' ),
					'after'  => '</div>',
				) );
				?>
			</div>
		</div>
	</article>
	<?php
endwhile;

get_footer();
