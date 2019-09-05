export const MAINNET = 'mainnet';
export const TESTNET = 'testnet';
export const NETWORK = process.env.APP_ENV === MAINNET ? MAINNET : TESTNET;
export const BASE_TITLE_NETWORK = NETWORK === MAINNET ? 'Mainnet ' : 'Testnet ';
export const BASE_TITLE_START = ' — Commercio ' + BASE_TITLE_NETWORK;
export const BASE_TITLE = BASE_TITLE_START + 'Explorer';
export const BASE_DESCRIPTION = '';
export const GA_ID = '';
