<?php
// This file is generated. Do not modify it manually.
return array(
	'dmg-read-more' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dmg-read-more/dmg-read-more',
		'version' => '0.1.0',
		'title' => 'DMG Read More',
		'category' => 'widgets',
		'description' => 'Adds a CTA to a post.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'textdomain' => 'dmg-read-more',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'attributes' => array(
			'selectedPostId' => array(
				'type' => 'number',
				'default' => 0
			),
			'selectedPostTitle' => array(
				'type' => 'string',
				'default' => ''
			),
			'selectedPostPermalink' => array(
				'type' => 'string',
				'default' => ''
			)
		)
	)
);
