<?php
/**
 * Front page: hero, category tiles, featured products.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();

$categories = array(
	array( 'Shoes', 'shoes', 'Trail-ready grip and cushioning.', 'prod-shoe.jpg' ),
	array( 'Apparel', 'apparel', 'Merino layers and featherweight shells.', 'cat-apparel.jpg' ),
	array( 'Equipment', 'equipment', 'Vests, poles and packs for long days out.', 'cat-equipment.jpg' ),
	array( 'Electronics', 'electronics', 'Watches and trackers that keep the line.', 'cat-electronics.jpg' ),
	array( 'Lighting', 'lighting', 'Headlamps for pre-dawn starts.', 'prod-headlamp.jpg' ),
	array( 'Nutrition', 'nutrition', 'Fuel that goes down easy at mile 20.', 'cat-nutrition.jpg' ),
	array( 'Recovery', 'recovery', 'Tools that get you back on trail.', 'cat-recovery.jpg' ),
	array( 'Accessories', 'accessories', 'Caps, gloves, glasses and the small stuff.', 'cat-accessories.jpg' ),
);
?>
<section class="dnd-hero">
	<img class="dnd-hero__bg" src="<?php echo esc_url( get_template_directory_uri() . '/assets/hero-trail.jpg' ); ?>" alt="Trail at dawn">
	<div class="dnd-hero__scrim"></div>
	<div class="dnd-hero__content">
		<p class="eyebrow"><?php esc_html_e( 'Find Your Ground. Chase Your Dawn.', 'dirt-dawn' ); ?></p>
		<h1><?php esc_html_e( 'Chase Your Dawn.', 'dirt-dawn' ); ?></h1>
		<p style="max-width:46ch; font-size:1.05rem;">Premium trail-running gear built for real dirt — tested on ridgelines, not in showrooms.</p>
		<div class="dnd-hero__cta">
			<?php if ( function_exists( 'wc_get_page_permalink' ) ) : ?>
				<a class="btn btn--light" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>"><?php esc_html_e( 'Shop the Collection', 'dirt-dawn' ); ?></a>
			<?php endif; ?>
			<a class="btn btn--ghost" href="<?php echo esc_url( home_url( '/shop/' ) ); ?>"><?php esc_html_e( 'Explore Categories', 'dirt-dawn' ); ?></a>
		</div>
	</div>
</section>

<section class="dnd-section">
	<div class="wrap">
		<div class="dnd-section__head">
			<h2><?php esc_html_e( 'Shop by Category', 'dirt-dawn' ); ?></h2>
		</div>
		<div class="dnd-grid">
			<?php foreach ( $categories as list( $label, $slug, $blurb, $img ) ) : ?>
				<a class="dnd-tile" href="<?php echo esc_url( home_url( '/product-category/' . $slug . '/' ) ); ?>">
					<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/' . $img ); ?>" alt="<?php echo esc_attr( $label ); ?>">
					<div class="dnd-tile__scrim"></div>
					<div class="dnd-tile__label">
						<h3><?php echo esc_html( $label ); ?></h3>
						<p><?php echo esc_html( $blurb ); ?></p>
					</div>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php if ( function_exists( 'do_shortcode' ) ) : ?>
<section class="dnd-section dnd-section--sand">
	<div class="wrap">
		<div class="dnd-section__head">
			<h2><?php esc_html_e( 'New Arrivals', 'dirt-dawn' ); ?></h2>
		</div>
		<?php echo do_shortcode( '[products limit="8" columns="4" visibility="visible" orderby="date"]' ); ?>
	</div>
</section>
<?php endif; ?>

<?php get_footer(); ?>
