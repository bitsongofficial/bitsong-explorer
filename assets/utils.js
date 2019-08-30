import toDate from "date-fns/esm/toDate";
import parseISO from "date-fns/esm/parseISO";
import formatDistanceStrict from "date-fns/esm/formatDistanceStrict";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import decode from "entity-decode";

export function getTimeDistance(timestamp) {
  if (typeof timestamp === "string") {
    //timestamp = parseISO(timestamp);ù
    timestamp = new Date(timestamp);
  }
  const now = new Date();
  // if timestamp from future
  if (timestamp > now) {
    timestamp = now;
  }

  const distance = formatDistanceStrict(timestamp, now, {
    roundingMethod: "floor"
  });

  return distance && distance !== "Invalid Date" ? distance : false;
}

export function pretty(value) {
  const PRECISION = 2;
  if (value >= 1 || value <= -1 || Number(value) === 0) {
    return decode(
      prettyNum(value, {
        precision: PRECISION,
        precisionSetting: PRECISION_SETTING.FIXED,
        thousandsSeparator: "&#x202F;"
      })
    );
  } else {
    value = decode(
      prettyNum(value, {
        precision: PRECISION,
        precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
        thousandsSeparator: "&#x202F;"
      })
    );
    value = value.substr(0, 10);
    if (value === "0.00000000") {
      return "0.00";
    }
    return value;
  }
}

export function prettyUsd(value) {
  return decode(
    prettyNum(value, { precision: 2, thousandsSeparator: "&#x202F;" })
  );
}

export function prettyRound(value) {
  return decode(
    prettyNum(value, { precision: 0, thousandsSeparator: "&#x202F;" })
  );
}

export function prettyExact(value) {
  return decode(prettyNum(value, { thousandsSeparator: "&thinsp;" }));
}

/**
 * Round to power
 * @param {number} value
 * @param {number} power
 * @return {number}
 */
export function round(value, power) {
  let tenPower = Math.pow(10, power);
  return Math.round(value * tenPower) / tenPower;
}

export function shortFilter(value, endLength = 6, minLengthToShort) {
  const startLength = endLength + "Mx".length - 1;
  minLengthToShort = minLengthToShort || startLength + endLength;
  value = value.toString();
  const isLong = value.length > minLengthToShort;

  return isLong
    ? value.substr(0, startLength) + "…" + value.substr(-endLength)
    : value;
}
