## DMG Read More plugin

Add to plugins directory, install add DMG Read more to post

## WP-CLI function

## NOTE:

This is incomplete. Needs more work to get it running but I know I need to get this over to you

Defaults to last 30 days
`wp dmg-read-more search`

Set period of time using YYYY-MM-DD format for dates
`wp dmg-read-more search --date-before=YYYY-MM-DD --date-after=YYYY-MM-DD`

### Improvements

- This will need to have some kind of batch processing/pauses
  added to go through hundreds of thousands of posts TBH.

- Should probably also look at passing in the post type as
  well and then can be extended to pages/custom post types
