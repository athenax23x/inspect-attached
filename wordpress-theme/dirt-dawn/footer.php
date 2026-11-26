</main>
<footer class="dnd-footer">
	<div class="dnd-footer__grid">
		<div>
			<strong style="font-family: var(--serif); font-size: 1.3rem;">DIRT &amp; DAWN</strong>
			<p style="font-size:.95rem; color: var(--sand); max-width: 34ch;">
				Find Your Ground. Chase Your Dawn. Premium trail-running and outdoor gear, tested on real dirt.
			</p>
			<div class="dnd-pay" aria-label="Accepted payment methods">
				<span>VISA</span><span>MASTERCARD</span><span>AMEX</span>
			</div>
		</div>
		<div>
			<h4><?php esc_html_e( 'Shop', 'dirt-dawn' ); ?></h4>
			<ul>
				<?php
				if ( function_exists( 'wc_get_page_permalink' ) ) {
					printf( '<li><a href="%s">All Products</a></li>', esc_url( wc_get_page_permalink( 'shop' ) ) );
				}
				foreach ( array( 'new-arrivals' => 'New Arrivals', 'apparel' => 'Apparel', 'equipment' => 'Equipment' ) as $slug => $label ) {
					printf( '<li><a href="%s">%s</a></li>', esc_url( home_url( '/product-category/' . $slug . '/' ) ), esc_html( $label ) );
				}
				?>
			</ul>
		</div>
		<div>
			<h4><?php esc_html_e( 'Company &amp; Policies', 'dirt-dawn' ); ?></h4>
			<?php dirt_dawn_footer_menu_fallback(); // phpcs:ignore ?>
		</div>
	</div>
	<div class="dnd-footer__bottom">
		&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> Dirt and Dawn. All rights reserved.
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
