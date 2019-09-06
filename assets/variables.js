const BASE_SHORT_TITLE = process.env.BASE_SHORT_TITLE
  ? process.env.BASE_SHORT_TITLE
  : "BitSong";

export const MAINNET = "mainnet";
export const TESTNET = "testnet";
export const NETWORK = process.env.TESTNET ? TESTNET : MAINNET;
export const BASE_TITLE_NETWORK = NETWORK === MAINNET ? "Mainnet " : "Testnet ";
export const BASE_TITLE_START =
  " — " + BASE_SHORT_TITLE + " " + BASE_TITLE_NETWORK;
export const BASE_TITLE = BASE_TITLE_START + "Explorer";
export const BASE_DESCRIPTION = process.env.BASE_DESCRIPTION;
export const GA_ID = process.env.GA_ID;
