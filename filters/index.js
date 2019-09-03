import BigNumber from "bignumber.js";
import config from "@/assets/config";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

export const formatBech32 = (address, longForm = false, length = 4) => {
  if (!address) {
    return `Address Not Found`;
  } else if (address.indexOf(`1`) === -1) {
    return `Not A Valid Bech32 Address`;
  } else if (longForm) {
    return address;
  } else {
    return address.split(`1`)[0] + `…` + address.slice(-1 * length);
  }
};

export const toBtsg = amount => {
  const number = new BigNumber(amount).div(10 ** config.decimals).toFixed(2);
  var parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

export const toMacroDenom = denom => {
  return denom.replace("u", "").toUpperCase();
};

export function toTime(timestamp) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  return timeAgo.format(new Date(timestamp));
}
