<?php
/**
 * Front page: hero, category tiles, on-sale products, brand story,
 * new arrivals and the newsletter band.
 *
 * Every product and category below comes from WooCommerce — the theme only
 * supplies the brand copy and layout.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$hero_image   = get_theme_file_uri( 'assets/img/hero-trail.jpg' );
$story_image  = get_theme_file_uri( 'assets/img/story-runner.jpg' );
$categories   = dirt_dawn_product_categories();
$on_sale      = dirt_dawn_products( array( 'on_sale' => true, 'limit' => 4, 'orderby' => 'date' ) );
$new_arrivals = dirt_dawn_products( array( 'limit' => 4, 'orderby' => 'date', 'order' => 'DESC' ) );
$shop_url     = dirt_dawn_shop_url();
$story_url    = dirt_dawn_story_url();
$gear_url     = dirt_dawn_category_link( 'equipment' );
$gear_url     = '' !== $gear_url ? $gear_url : $shop_url;
$email        = dirt_dawn_contact_email();
?>

<section class="dnd-hero">
	<img class="dnd-hero__img" src="<?php echo esc_url( $hero_image ); ?>" alt="<?php esc_attr_e( 'Trail runner at dawn', 'dirt-dawn' ); ?>" width="1920" height="1080" fetchpriority="high" decoding="async">
	<div class="dnd-hero__scrim" aria-hidden="true"></div>
	<div class="dnd-hero__content">
		<div class="container-x dnd-hero__inner">
			<p class="eyebrow eyebrow--sand"><?php esc_html_e( 'Trail Running, Elevated', 'dirt-dawn' ); ?></p>
			<h1><?php esc_html_e( 'Find Your Ground.', 'dirt-dawn' ); ?><br><?php esc_html_e( 'Chase Your Dawn.', 'dirt-dawn' ); ?></h1>
			<p class="dnd-hero__lede"><?php esc_html_e( 'Apparel, packs and gear built for the hours when the trail is still asleep.', 'dirt-dawn' ); ?></p>
			<div class="dnd-hero__actions">
				<a class="btn-light" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Shop the Collection', 'dirt-dawn' ); ?></a>
				<a class="btn btn--ghost-light" href="<?php echo esc_url( $gear_url ); ?>"><?php esc_html_e( 'Gear Up', 'dirt-dawn' ); ?></a>
			</div>
		</div>
	</div>
</section>

<?php if ( ! empty( $categories ) ) : ?>
	<section class="section container-x" id="categories">
		<p class="eyebrow"><?php esc_html_e( 'The Categories', 'dirt-dawn' ); ?></p>
		<h2 class="section-title"><?php esc_html_e( 'Built for every kilometre', 'dirt-dawn' ); ?></h2>
		<div class="dnd-cat-grid">
			<?php foreach ( $categories as $term ) : ?>
				<?php
				$image = dirt_dawn_category_image( $term, 'large' );
				$blurb = dirt_dawn_category_blurb( $term );
				?>
				<a class="dnd-tile" href="<?php echo esc_url( (string) get_term_link( $term ) ); ?>">
					<?php if ( '' !== $image ) : ?>
						<img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $term->name ); ?>" width="800" height="1000" loading="lazy" decoding="async">
					<?php endif; ?>
					<span class="dnd-tile__scrim" aria-hidden="true"></span>
					<span class="dnd-tile__body">
						<span class="dnd-tile__name"><?php echo esc_html( $term->name ); ?></span>
						<?php if ( '' !== $blurb ) : ?>
							<span class="dnd-tile__blurb"><?php echo esc_html( $blurb ); ?></span>
						<?php endif; ?>
						<span class="dnd-tile__cta"><?php esc_html_e( 'Explore →', 'dirt-dawn' ); ?></span>
					</span>
				</a>
			<?php endforeach; ?>
		</div>
	</section>
<?php endif; ?>

<?php if ( ! empty( $on_sale ) ) : ?>
	<section class="container-x dnd-sale-section" id="on-sale">
		<div class="section-head">
			<div>
				<p class="eyebrow"><?php esc_html_e( 'Priced to Move', 'dirt-dawn' ); ?></p>
				<h2><?php esc_html_e( 'On Sale', 'dirt-dawn' ); ?></h2>
			</div>
			<a class="section-link" href="<?php echo esc_url( dirt_dawn_sale_url() ); ?>"><?php esc_html_e( 'View all →', 'dirt-dawn' ); ?></a>
		</div>
		<ul class="products dnd-card-grid dnd-card-grid--home">
			<?php foreach ( $on_sale as $product ) : ?>
				<?php dirt_dawn_product_card( $product ); ?>
			<?php endforeach; ?>
		</ul>
	</section>
<?php endif; ?>

<section class="dnd-story">
	<div class="container-x dnd-story__grid">
		<div>
			<p class="eyebrow eyebrow--sand"><?php esc_html_e( 'Our Story', 'dirt-dawn' ); ?></p>
			<h2><?php esc_html_e( 'Built for the hour before first light', 'dirt-dawn' ); ?></h2>
			<p><?php esc_html_e( 'Dirt and Dawn makes outdoor and trail-running gear for early starts and long days: honest kit designed for hard ground, changing weather and real distances — priced so the entry fee never outruns the trail fee.', 'dirt-dawn' ); ?></p>
			<?php if ( '' !== $story_url ) : ?>
				<div class="dnd-story__actions">
					<a class="btn-light" href="<?php echo esc_url( $story_url ); ?>"><?php esc_html_e( 'Read Our Approach', 'dirt-dawn' ); ?></a>
				</div>
			<?php endif; ?>
		</div>
		<img src="<?php echo esc_url( $story_image ); ?>" alt="<?php esc_attr_e( 'Runner at sunrise', 'dirt-dawn' ); ?>" width="900" height="700" loading="lazy" decoding="async">
	</div>
</section>

<?php if ( ! empty( $new_arrivals ) ) : ?>
	<section class="section container-x" id="new-arrivals">
		<div class="section-head">
			<div>
				<p class="eyebrow"><?php esc_html_e( 'Just Landed', 'dirt-dawn' ); ?></p>
				<h2><?php esc_html_e( 'New Arrivals', 'dirt-dawn' ); ?></h2>
			</div>
			<a class="section-link" href="<?php echo esc_url( dirt_dawn_new_arrivals_url() ); ?>"><?php esc_html_e( 'View all →', 'dirt-dawn' ); ?></a>
		</div>
		<ul class="products dnd-card-grid dnd-card-grid--home">
			<?php foreach ( $new_arrivals as $product ) : ?>
				<?php dirt_dawn_product_card( $product ); ?>
			<?php endforeach; ?>
		</ul>
	</section>
<?php endif; ?>

<section class="dnd-newsletter container-x" id="newsletter">
	<div class="dnd-newsletter__panel">
		<p class="eyebrow"><?php esc_html_e( 'The Dawn Dispatch', 'dirt-dawn' ); ?></p>
		<h2><?php esc_html_e( 'Trail stories, route notes, early access', 'dirt-dawn' ); ?></h2>
		<p class="dnd-newsletter__sub"><?php esc_html_e( 'One email a month. No noise, unsubscribe anytime.', 'dirt-dawn' ); ?></p>

		<form class="dnd-newsletter__form" id="dnd-newsletter" novalidate data-email="<?php echo esc_attr( $email ); ?>">
			<label class="screen-reader-text" for="dnd-newsletter-email"><?php esc_html_e( 'Email address', 'dirt-dawn' ); ?></label>
			<input class="input" id="dnd-newsletter-email" name="email" type="email" required autocomplete="email" placeholder="<?php esc_attr_e( 'you@email.com', 'dirt-dawn' ); ?>" aria-describedby="dnd-newsletter-help dnd-newsletter-error">
			<button class="btn-primary" type="submit"><?php esc_html_e( 'Subscribe', 'dirt-dawn' ); ?></button>
		</form>
		<p class="dnd-newsletter__note" id="dnd-newsletter-help"><?php esc_html_e( 'Opens a pre-addressed email — no account needed.', 'dirt-dawn' ); ?></p>
		<p class="dnd-newsletter__error" id="dnd-newsletter-error" role="alert" hidden></p>

		<noscript>
			<p class="dnd-newsletter__note">
				<a href="mailto:<?php echo esc_attr( $email ); ?>?subject=<?php echo esc_attr( rawurlencode( __( 'Newsletter signup — The Dawn Dispatch', 'dirt-dawn' ) ) ); ?>"><?php esc_html_e( 'Email us to join the Dawn Dispatch', 'dirt-dawn' ); ?></a>
			</p>
		</noscript>
	</div>
</section>

<?php
get_footer();
