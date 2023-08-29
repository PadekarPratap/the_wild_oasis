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
