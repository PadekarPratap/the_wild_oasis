import supabase from "./supabase";

export const getGuests = async (name) => {
  let query = supabase.from("guest").select("*");

  if (name) {
    query = query.textSearch("name", name);
  }

  let { data: guest, error } = await query;

  if (error) {
    throw new Error("Unable to get the guests data");
  }

  return guest;
};
