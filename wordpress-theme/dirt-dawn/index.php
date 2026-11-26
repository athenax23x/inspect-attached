<?php
/**
 * Blog index and fallback template.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<header class="dnd-page-head">
	<div class="container-x dnd-page-head__inner">
		<p class="eyebrow"><?php esc_html_e( 'Dirt and Dawn', 'dirt-dawn' ); ?></p>
		<h1>
			<?php
			if ( is_search() ) {
				/* translators: %s: search query */
				printf( esc_html__( 'Results for “%s”', 'dirt-dawn' ), esc_html( get_search_query() ) );
			} elseif ( is_archive() ) {
				the_archive_title();
			} else {
				esc_html_e( 'Journal', 'dirt-dawn' );
			}
			?>
		</h1>
	</div>
</header>

<div class="container-x dnd-entry">
	<?php if ( have_posts() ) : ?>
		<div class="dnd-post-list">
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<article <?php post_class( 'dnd-post' ); ?>>
					<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<p class="dnd-post__meta"><?php echo esc_html( get_the_date() ); ?></p>
					<div class="dnd-prose"><?php the_excerpt(); ?></div>
				</article>
				<?php
			endwhile;
			?>
		</div>
		<?php the_posts_pagination(); ?>
	<?php else : ?>
		<div class="dnd-empty-shop">
			<h2><?php esc_html_e( 'Nothing here yet', 'dirt-dawn' ); ?></h2>
			<p><?php esc_html_e( 'Try the shop — the full range is a click away.', 'dirt-dawn' ); ?></p>
			<a class="btn-primary" href="<?php echo esc_url( dirt_dawn_shop_url() ); ?>"><?php esc_html_e( 'Shop all gear', 'dirt-dawn' ); ?></a>
		</div>
	<?php endif; ?>
</div>

<?php
get_footer();
