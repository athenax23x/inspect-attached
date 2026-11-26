<?php
/**
 * Footer: brand column, shop, support and legal columns built from real pages.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$footer_categories = dirt_dawn_product_categories( 6 );
$support_links     = array(
	__( 'Contact', 'dirt-dawn' )             => dirt_dawn_page_url( 'contact', 'contact-us' ),
	__( 'Shipping & Delivery', 'dirt-dawn' ) => dirt_dawn_page_url( 'shipping-and-delivery', 'shipping' ),
	__( 'Returns & Refunds', 'dirt-dawn' )   => dirt_dawn_page_url( 'returns-and-refunds', 'returns' ),
	__( 'Warranty Policy', 'dirt-dawn' )     => dirt_dawn_page_url( 'warranty-policy', 'warranty' ),
	__( 'Cancellation Policy', 'dirt-dawn' ) => dirt_dawn_page_url( 'cancellation-policy', 'cancellation' ),
);
$legal_links       = array(
	__( 'Terms & Conditions', 'dirt-dawn' ) => dirt_dawn_page_url( 'terms-and-conditions', 'terms' ),
	__( 'Privacy Policy', 'dirt-dawn' )     => dirt_dawn_page_url( 'privacy-policy', 'privacy' ),
	__( 'Cookie Policy', 'dirt-dawn' )      => dirt_dawn_page_url( 'cookie-policy', 'cookies' ),
	__( 'Payment Policy', 'dirt-dawn' )     => dirt_dawn_page_url( 'payment-policy', 'payment' ),
);
$email             = dirt_dawn_contact_email();
?>
</main><!-- #main -->

<footer class="dnd-footer">
	<div class="container-x dnd-footer__grid">
		<div class="dnd-footer__brand">
			<p class="word"><?php esc_html_e( 'DIRT', 'dirt-dawn' ); ?> <span class="amp">&amp;</span> <?php esc_html_e( 'DAWN', 'dirt-dawn' ); ?></p>
			<p class="dnd-footer__tag"><?php esc_html_e( 'Built for the Outdoors', 'dirt-dawn' ); ?></p>
			<p class="dnd-footer__motto"><?php esc_html_e( 'Find Your Ground. Chase Your Dawn.', 'dirt-dawn' ); ?></p>
			<address>
				<span>932 Owens RD, Oxon Hill,</span>
				<span>MD 20745</span>
				<a href="mailto:<?php echo esc_attr( $email ); ?>"><?php echo esc_html( $email ); ?></a>
			</address>
		</div>

		<div class="dnd-footer__col">
			<h2><?php esc_html_e( 'Shop', 'dirt-dawn' ); ?></h2>
			<ul>
				<?php foreach ( $footer_categories as $term ) : ?>
					<li><a href="<?php echo esc_url( (string) get_term_link( $term ) ); ?>"><?php echo esc_html( $term->name ); ?></a></li>
				<?php endforeach; ?>
				<li><a href="<?php echo esc_url( dirt_dawn_shop_url() ); ?>"><?php esc_html_e( 'Shop All', 'dirt-dawn' ); ?></a></li>
				<li><a href="<?php echo esc_url( dirt_dawn_sale_url() ); ?>"><?php esc_html_e( 'Sale', 'dirt-dawn' ); ?></a></li>
			</ul>
		</div>

		<div class="dnd-footer__col">
			<h2><?php esc_html_e( 'Customer Support', 'dirt-dawn' ); ?></h2>
			<ul>
				<?php foreach ( $support_links as $label => $url ) : ?>
					<?php if ( '' !== $url ) : ?>
						<li><a href="<?php echo esc_url( $url ); ?>"><?php echo esc_html( $label ); ?></a></li>
					<?php endif; ?>
				<?php endforeach; ?>
				<li><a href="<?php echo esc_url( dirt_dawn_account_url() ); ?>"><?php esc_html_e( 'My Account', 'dirt-dawn' ); ?></a></li>
			</ul>
		</div>

		<div class="dnd-footer__col">
			<h2><?php esc_html_e( 'Legal', 'dirt-dawn' ); ?></h2>
			<ul>
				<?php foreach ( $legal_links as $label => $url ) : ?>
					<?php if ( '' !== $url ) : ?>
						<li><a href="<?php echo esc_url( $url ); ?>"><?php echo esc_html( $label ); ?></a></li>
					<?php endif; ?>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>

	<div class="dnd-footer__bottom">
		<div class="container-x dnd-footer__bottom-inner">
			<span>&copy; <?php echo esc_html( date_i18n( 'Y' ) ); ?> <?php esc_html_e( 'Dirt Dawn. All rights reserved.', 'dirt-dawn' ); ?></span>
			<span><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php echo esc_html( wp_parse_url( home_url(), PHP_URL_HOST ) ?: 'dirtdawn.solutions' ); ?></a></span>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
