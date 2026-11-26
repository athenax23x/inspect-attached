<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="dnd-header">
	<div class="dnd-header__bar">
		<a class="dnd-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
			<strong>DIRT &amp; DAWN</strong>
			<span>Built for the Outdoors</span>
		</a>
		<nav class="dnd-nav" aria-label="<?php esc_attr_e( 'Primary Menu', 'dirt-dawn' ); ?>">
			<?php
			if ( has_nav_menu( 'primary' ) ) {
				wp_nav_menu( array(
					'theme_location' => 'primary',
					'container'      => false,
					'depth'          => 1,
				) );
			} else {
				echo '<ul>';
				printf( '<li><a href="%s">Home</a></li>', esc_url( home_url( '/' ) ) );
				if ( function_exists( 'wc_get_page_permalink' ) ) {
					printf( '<li><a href="%s">Shop</a></li>', esc_url( wc_get_page_permalink( 'shop' ) ) );
				}
				foreach ( array( 'about' => 'Story', 'contact' => 'Contact' ) as $slug => $label ) {
					$page = get_page_by_path( $slug );
					if ( $page ) {
						printf( '<li><a href="%s">%s</a></li>', esc_url( get_permalink( $page ) ), esc_html( $label ) );
					}
				}
				echo '</ul>';
			}
			?>
		</nav>
		<div class="dnd-header__actions">
			<?php if ( function_exists( 'WC' ) ) : ?>
				<a href="<?php echo esc_url( wc_get_cart_url() ); ?>"><?php echo dirt_dawn_cart_count( 'Cart' ); // phpcs:ignore ?></a>
			<?php endif; ?>
		</div>
	</div>
</header>
<main>
