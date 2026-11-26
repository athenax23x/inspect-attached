<?php
/**
 * 404.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<div class="container-x dnd-404">
	<p class="eyebrow"><?php esc_html_e( 'Off trail', 'dirt-dawn' ); ?></p>
	<h1><?php esc_html_e( 'This path does not exist', 'dirt-dawn' ); ?></h1>
	<p><?php esc_html_e( 'The page moved or never existed. The trail head is just below.', 'dirt-dawn' ); ?></p>
	<p><a class="btn-primary" href="<?php echo esc_url( dirt_dawn_shop_url() ); ?>"><?php esc_html_e( 'Back to the shop', 'dirt-dawn' ); ?></a></p>
</div>

<?php
get_footer();
