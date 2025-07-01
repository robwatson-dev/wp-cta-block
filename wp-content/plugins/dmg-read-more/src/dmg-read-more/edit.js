import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
	Button,
	Panel,
	PanelBody,
	TextControl,
	Spinner,
} from "@wordpress/components";

import { useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

const Edit = (props) => {
	const {
		attributes: { selectedPostId, selectedPostTitle, selectedPostPermalink },
		setAttributes,
	} = props;

	const blockProps = useBlockProps();

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		setLoading(true);

		const perPage = searchTerm ? 5 : 2;

		const path = searchTerm
			? isNaN(searchTerm)
				? `/wp/v2/posts?search=${searchTerm}&per_page=${perPage}&page=${currentPage}`
				: `/wp/v2/posts?include[]=${searchTerm}`
			: `/wp/v2/posts?per_page=${perPage}`;

		apiFetch({ path })
			.then((posts) => {
				setSearchResults(posts);
				setLoading(false);
				if (searchTerm && !isNaN(searchTerm)) {
					setTotalPages(1);
				} else if (searchTerm) {
					apiFetch({ path: `/wp/v2/posts?search=${searchTerm}` }).then(
						(allPosts) => {
							setTotalPages(Math.ceil(allPosts.length / perPage));
						},
					);
				} else {
					// pagination not required on latest posts (which defaults to 5)
					setTotalPages(1);
				}
			})
			.catch(() => {
				setLoading(false);
			});
	}, [searchTerm, currentPage]);

	const selectPost = (post) => {
		setAttributes({
			selectedPostId: post.id,
			selectedPostTitle: post.title.rendered,
			selectedPostPermalink: post.link,
		});
	};

	/** Deals with +/-1 for pagination */
	const nextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};
	const prevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	/** Render */
	return (
		<div {...blockProps}>
			<InspectorControls>
				<Panel>
					<PanelBody title={__("Search Posts", "dmg-read-more")}>
						<TextControl
							label={__("Search Posts", "dmg-read-more")}
							placeholder={__("Post title", "dmg-read-more")}
							value={searchTerm}
							onChange={(value) => {
								setSearchTerm(value);
								setCurrentPage(1);
							}}
						/>

						{loading && <Spinner />}
						<p>{__("Select a post from the list below", "dmg-read-more")}</p>
					</PanelBody>
					<PanelBody title={__("Select a post", "dmg-read-more")}>
						{searchResults.length > 0 && (
							<ul className="search-results">
								{searchResults.map((post) => (
									<li key={post.id}>
										<Button onClick={() => selectPost(post)}>
											{post.title.rendered}
										</Button>
									</li>
								))}
							</ul>
						)}
						{searchTerm && totalPages > 1 && (
							<div className="dmg-pagination">
								<Button
									className="dmg-pagination__btn dmg-pagination__btn--prev"
									onClick={prevPage}
									disabled={currentPage === 1}
								>
									{__("Prev", "dmg-read-more")}
								</Button>
								<p className="dmg-pagination__nav">
									{__("Page", "dmg-read-more")} {currentPage}{" "}
									{__("of", "dmg-read-more")} {totalPages}
								</p>
								<Button
									className="dmg-pagination__btn dmg-pagination__btn--next"
									onClick={nextPage}
									disabled={currentPage === totalPages}
								>
									{__("Next", "dmg-read-more")}
								</Button>
							</div>
						)}
					</PanelBody>
				</Panel>
			</InspectorControls>

			<div>
				{selectedPostId ? (
					/* TODO: class cta--1 this could be extended to allow different styles of CTA with a selector for content editors, retaining design style guidlines instead of the free for all WP offers */
					<a className="dmg-read-more cta cta--1" href={selectedPostPermalink}>
						{__("Read More: ", "dmg-read-more")}
						{selectedPostTitle}
					</a>
				) : (
					<p>{__("Search for a post and select it", "dmg-read-more")}</p>
				)}
			</div>
		</div>
	);
};

export default Edit;
