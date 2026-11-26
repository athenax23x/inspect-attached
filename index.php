<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();
?>
<div class="wrap dnd-page-title">
	<h1><?php esc_html_e( 'Dirt & Dawn', 'dirt-dawn' ); ?></h1>
</div>
<div class="wrap" style="padding: 1.5rem 1.25rem 3rem;">
	<?php
	while ( have_posts() ) {
		the_post();
		the_content();
	}
	?>
</div>
<?php get_footer(); ?>
