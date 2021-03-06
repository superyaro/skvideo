# skvideo
TYPO3 content element to cache thumbnails of youtube/vimeo videos and play them after user confirmation. Responsive display. Works with css_styled_content and fluid_styled_content. No other dependencies (no jquery etc).

## How it works
The **editor** inserts a skvideo content element into a page. He needs to specify
* the youtube/vimeo video code
* the type of the video (youtube or vimeo)
* whether to include the video title embedded in the preview image
* the width vs height ratio (16:9 or 4:3)
* optionally set a maximum width of the video on the page (otherwise it defaults to full width display)


The **end user** visits the page. The plugin fetches and stores a copy of the video thumbnail on the server. So the user's browser downloads the thumbnail from the site server, and not from the video provider. 

If the user presses the play button of the video, he is being presented with a customizable notice and is asked to confirm that he want to play the video. Optionally, the user can check a checkbox to store his decission via a cookie for 30 days.

If the user confirms, the video is played. In case the user had checked the checkbox to store his decission, the video is played without the notice.


## How to install
The content element needs css_styled_content or fluid_styled_content in order to work. So one of these extensions must be enabled on your site.

Additionally, the SK Video static template must have been included into your TYPO3 template.

## Configuration
### Texts
You can adapt the text of the confirmation modal dialog displayed to the user via constants.

`plugin.tx_skvideo.settings.message`: This is the text the user is asked to agree before viewing the video. You can use HTML markup in here.

`plugin.tx_skvideo.settings.rememberme`: The text for the remember my decision checkbox

`plugin.tx_skvideo.settings.cancel`: The text for the cancel button

`plugin.tx_skvideo.settings.continue`: The text for the agree button

### Thumbnail cache lifetime
The extension has 2 options to control the lifetime of the preview images and the associated video texts (title etc). Essentially they control how long these should be cached. Currently both values default to 1209600 seconds which is 2 weeks.

You can change these options in the extensions manager, after clicking on the extension name.
