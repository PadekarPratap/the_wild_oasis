import { getToday } from "../utils/helper";
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

export const getBooking = async (id) => {
  let { data: booking, error } = await supabase
    .from("booking")
    .select("*, guest(*), cabin(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Could not load the Booking");
  }

  return booking;
};

export const updateBooking = async (id, updatedBooking) => {
  console.log(id);

  const { data, error } = await supabase
    .from("booking")
    .update({ is_paid: true, status: "checked-in", ...updatedBooking })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new Error("There was an error updating the booking");
  }

  console.log(data);

  return data;
};

export const deleteBooking = async (bookingId) => {
  const { data, error } = await supabase
    .from("booking")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.log(error.message);
    throw new Error("The Booking could not be deleted");
  }

  return data;
};

export const getBookingsAfterDate = async (date) => {
  const { error, data: bookingsAfterDate } = await supabase
    .from("booking")
    .select("*")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    throw new Error("There was an error loading the bookings");
  }

  return bookingsAfterDate;
};

export const getStaysAfterDate = async (date) => {
  const { error, data } = await supabase
    .from("booking")
    .select("*, guest(name)")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    throw new Error("There was an error loading the stays");
  }

  return data;
};
