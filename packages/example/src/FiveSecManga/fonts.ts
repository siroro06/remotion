import {loadFont as loadBangers} from '@remotion/google-fonts/Bangers';
import {loadFont as loadDelaGothicOne} from '@remotion/google-fonts/DelaGothicOne';

// Bangers letters the English captions, Dela Gothic One the katakana sound effects.
loadBangers('normal', {weights: ['400'], subsets: ['latin']});
// Google Fonts ships Japanese as ~120 numbered unicode-range chunks.
loadDelaGothicOne('normal', {
	weights: ['400'],
	subsets: ['latin', 'japanese'],
	ignoreTooManyRequestsWarning: true,
});
