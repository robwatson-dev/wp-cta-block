<?php

	class DMG_Read_More_Command extends WP_CLI_Command {

			public function __invoke( $args, $assoc_args ) {

				// grab date and default to now/-30 days if not
				$date_after = isset( $assoc_args['date-after'] ) ? $assoc_args['date-after'] : date('Y-m-d', strtotime('-30 days', current_time('timestamp')));

				$date_before = isset( $assoc_args['date-before'] ) ? $assoc_args['date-before'] : date('Y-m-d', current_time('timestamp'));

				if ( ! $this->check_date( $date_before ) || ! $this->check_date( $date_after ) ) {
					WP_CLI::error( 'Invalid date format. YYYY-MM-DD should be used.' );
				}

				$this->query_posts( $date_after, $date_before );

			}

			private function check_date( $d ) {
				$date = DateTime::createFromFormat('Y-m-d', $d);
				return $date && $date->format('Y-m-d') === $d;
			}

			private function query_posts( $date_after, $date_before ) {
				// set up args for post query
				$args = [
					'post_type' => 'post',
					'post_status' => 'publish',
					'fields' => 'ids',
					'no_found_rows' => true,
					'update_post_meta_cache' => false,
					'cache_results' => false,
					'date_query' => [
						'after' => $date_after,
						'before' => $date_before,
						'inclusive' => true,
					],
				];

				$query = new WP_Query( $args );

				// loop through posts
				if ( $query->have_posts() ) {
					foreach ( $query->posts as $post_id ) {
						$post = get_post( $post_id );
						if ( has_block( 'dmg-read-more/dmg-read-more', $post->post_content ) ) {
							WP_CLI::log( 'Block found in post ID: ' . $post_id );
						}
					}
				} else {
					WP_CLI::log( 'No posts found.' );
				}
			}
	}
