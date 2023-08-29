import supabase from "./supabase";

export const getBookings = async ({ filter, sort }) => {
  let query = supabase
    .from("booking")
    .select("*, guest(name, email), cabin(cabin_name)");

  if (filter.filterValue !== "all") {
    query = query.eq(filter.value, filter.filterValue);
  }

  query = query.order(sort.sortField, {
    ascending: sort.sortDirection === "asc",
  });

  let { data: booking, error } = await query;

  if (error) {
    throw new Error("Bookings data could not be loaded");
  }

  return booking;
};
