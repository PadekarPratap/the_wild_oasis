// supabse password:-
/* fcDuoRPE1GSeNToz */

import moment from "moment/moment";

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const TimeAgo = (date) => {
  return moment(date).fromNow();
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

export const formatDateInDetail = (date) => {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    weekday: "short",
  }).format(new Date(date));
};

export const formatTimeInDetail = (date) => {
  return Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h12",
  }).format(new Date(date));
};
