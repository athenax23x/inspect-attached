<?php
/**
 * Header: announcement bar, sticky bar with wordmark, mega menu and actions.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$shop_menu        = dirt_dawn_shop_menu();
$activities_menu  = dirt_dawn_activities_menu();
$collections_menu = dirt_dawn_collections_menu();
$story_url        = dirt_dawn_story_url();
$cart_count       = dirt_dawn_cart_count();
$shop_url         = dirt_dawn_shop_url();
$is_shop          = function_exists( 'is_shop' ) && ( is_shop() || is_product_taxonomy() );
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main"><?php esc_html_e( 'Skip to content', 'dirt-dawn' ); ?></a>

<div class="dnd-announce">
	<?php
	echo wp_kses_post(
		apply_filters(
			'dirt_dawn_announcement',
			sprintf(
				/* translators: %s: coupon code */
				esc_html__( 'Code %s — 10%% off your order', 'dirt-dawn' ),
				'<strong>DAWN10</strong>'
			)
		)
	);
	?>
</div>

<header class="dnd-header" id="dnd-header">
	<div class="container-x dnd-header__inner">
		<button class="dnd-burger" id="dnd-burger" type="button" aria-controls="dnd-drawer" aria-expanded="false" aria-label="<?php esc_attr_e( 'Open menu', 'dirt-dawn' ); ?>">
			<?php echo dirt_dawn_icon( 'menu' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</button>

		<a class="dnd-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
			<span class="dnd-brand__word"><?php esc_html_e( 'DIRT', 'dirt-dawn' ); ?> <span class="amp">&amp;</span> <?php esc_html_e( 'DAWN', 'dirt-dawn' ); ?></span>
			<span class="dnd-brand__tag"><?php esc_html_e( 'Built for the Outdoors', 'dirt-dawn' ); ?></span>
		</a>

		<nav class="dnd-nav" aria-label="<?php esc_attr_e( 'Primary', 'dirt-dawn' ); ?>">
			<div class="dnd-nav__item dnd-nav__item--mega" data-menu="shop">
				<button type="button" class="dnd-nav__toggle" aria-expanded="false" aria-haspopup="true" aria-controls="dnd-menu-shop">
					<?php esc_html_e( 'Shop', 'dirt-dawn' ); ?>
					<?php echo dirt_dawn_chevron(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</button>
				<div class="dnd-nav__panel dnd-nav__panel--mega" id="dnd-menu-shop">
					<div class="dnd-nav__panel-inner">
						<?php foreach ( $shop_menu as $item ) : ?>
							<a class="dnd-mega__link" href="<?php echo esc_url( $item['url'] ); ?>">
								<span class="dnd-mega__label"><?php echo esc_html( $item['label'] ); ?></span>
								<?php if ( ! empty( $item['blurb'] ) ) : ?>
									<span class="dnd-mega__blurb"><?php echo esc_html( $item['blurb'] ); ?></span>
								<?php endif; ?>
							</a>
						<?php endforeach; ?>
					</div>
				</div>
			</div>

			<?php if ( ! empty( $activities_menu ) ) : ?>
				<div class="dnd-nav__item" data-menu="activities">
					<button type="button" class="dnd-nav__toggle" aria-expanded="false" aria-haspopup="true" aria-controls="dnd-menu-activities">
						<?php esc_html_e( 'Activities', 'dirt-dawn' ); ?>
						<?php echo dirt_dawn_chevron(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</button>
					<div class="dnd-nav__panel dnd-nav__panel--sm" id="dnd-menu-activities">
						<div class="dnd-nav__panel-inner">
							<?php foreach ( $activities_menu as $item ) : ?>
								<a class="dnd-mega__link" href="<?php echo esc_url( $item['url'] ); ?>"><?php echo esc_html( $item['label'] ); ?></a>
							<?php endforeach; ?>
						</div>
					</div>
				</div>
			<?php endif; ?>

			<div class="dnd-nav__item" data-menu="collections">
				<button type="button" class="dnd-nav__toggle" aria-expanded="false" aria-haspopup="true" aria-controls="dnd-menu-collections">
					<?php esc_html_e( 'Collections', 'dirt-dawn' ); ?>
					<?php echo dirt_dawn_chevron(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</button>
				<div class="dnd-nav__panel dnd-nav__panel--sm" id="dnd-menu-collections">
					<div class="dnd-nav__panel-inner">
						<?php foreach ( $collections_menu as $item ) : ?>
							<a class="dnd-mega__link" href="<?php echo esc_url( $item['url'] ); ?>"><?php echo esc_html( $item['label'] ); ?></a>
						<?php endforeach; ?>
					</div>
				</div>
			</div>

			<?php if ( '' !== $story_url ) : ?>
				<a class="dnd-nav__plain" href="<?php echo esc_url( $story_url ); ?>"><?php esc_html_e( 'Our Story', 'dirt-dawn' ); ?></a>
			<?php endif; ?>
		</nav>

		<div class="dnd-utils">
			<a class="dnd-util" href="<?php echo esc_url( $shop_url ); ?>" aria-label="<?php esc_attr_e( 'Search products', 'dirt-dawn' ); ?>" title="<?php esc_attr_e( 'Search', 'dirt-dawn' ); ?>">
				<?php echo dirt_dawn_icon( 'search' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
			<a class="dnd-util" href="<?php echo esc_url( dirt_dawn_account_url() ); ?>" aria-label="<?php esc_attr_e( 'Account', 'dirt-dawn' ); ?>" title="<?php esc_attr_e( 'Account', 'dirt-dawn' ); ?>">
				<?php echo dirt_dawn_icon( 'account' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
			<a class="dnd-util" href="<?php echo esc_url( dirt_dawn_cart_url() ); ?>" aria-label="<?php echo esc_attr( sprintf( /* translators: %d: cart item count */ _n( 'Shopping bag (%d item)', 'Shopping bag (%d items)', $cart_count, 'dirt-dawn' ), $cart_count ) ); ?>" title="<?php esc_attr_e( 'Shopping bag', 'dirt-dawn' ); ?>">
				<?php echo dirt_dawn_icon( 'cart' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<span class="dnd-util__badge dnd-cart-count"<?php echo $cart_count ? '' : ' hidden'; ?>><?php echo esc_html( (string) $cart_count ); ?></span>
			</a>
		</div>
	</div>

	<div class="dnd-drawer" id="dnd-drawer">
		<span class="label"><?php esc_html_e( 'Shop', 'dirt-dawn' ); ?></span>
		<ul>
			<?php foreach ( $shop_menu as $item ) : ?>
				<li><a href="<?php echo esc_url( $item['url'] ); ?>"><?php echo esc_html( $item['label'] ); ?></a></li>
			<?php endforeach; ?>
		</ul>

		<span class="label"><?php esc_html_e( 'Collections', 'dirt-dawn' ); ?></span>
		<ul>
			<?php foreach ( $collections_menu as $item ) : ?>
				<li><a href="<?php echo esc_url( $item['url'] ); ?>"><?php echo esc_html( $item['label'] ); ?></a></li>
			<?php endforeach; ?>
		</ul>

		<?php if ( ! empty( $activities_menu ) ) : ?>
			<span class="label"><?php esc_html_e( 'Activities', 'dirt-dawn' ); ?></span>
			<ul>
				<?php foreach ( $activities_menu as $item ) : ?>
					<li><a href="<?php echo esc_url( $item['url'] ); ?>"><?php echo esc_html( $item['label'] ); ?></a></li>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>

		<?php if ( '' !== $story_url ) : ?>
			<ul class="dnd-drawer__foot">
				<li><a href="<?php echo esc_url( $story_url ); ?>"><?php esc_html_e( 'Our Story', 'dirt-dawn' ); ?></a></li>
			</ul>
		<?php endif; ?>
	</div>
</header>

<main id="main" class="dnd-main">
