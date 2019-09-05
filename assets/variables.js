export const MAINNET = 'mainnet';
export const TESTNET = 'testnet';
export const NETWORK = process.env.APP_ENV === MAINNET ? MAINNET : TESTNET;
export const BASE_TITLE_NETWORK = NETWORK === MAINNET ? 'Mainnet ' : 'Testnet ';
export const BASE_TITLE_START = ' — BitSong ' + BASE_TITLE_NETWORK;
export const BASE_TITLE = BASE_TITLE_START + 'Explorer';
export const BASE_DESCRIPTION = '';
export const GA_ID = 'G-3MLN5HH7EG';
export const EXPLORER_API_URL = "https://api.testnet.explorebitsong.com"
