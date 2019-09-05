import {
  BASE_TITLE
} from '~/assets/variables';

export default function getTitle(text) {
  const explorer = 'Explorer';
  if (text) {
    return text + BASE_TITLE;
  } else {
    return BASE_TITLE.replace(' — ', '');
  }
}
