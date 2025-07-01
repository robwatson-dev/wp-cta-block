/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

const Save = (props) => {
	const {
		attributes: { selectedPostTitle, selectedPostPermalink },
	} = props;

	if (!selectedPostPermalink) return null;

	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<a className="dmg-read-more cta cta--1" href={selectedPostPermalink}>
				{__("Read More: ", "dmg-read-more")}
				{selectedPostTitle}
			</a>
		</div>
	);
};

export default Save;
