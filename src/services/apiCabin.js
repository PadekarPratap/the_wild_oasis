import supabase from "./supabase";

const getCabins = async () => {
  let { data, error } = await supabase.from("cabin").select("*");

  if (error) {
    console.log(error.message);
    throw new Error("There was an error loading all the cabin data");
  }

  return data;
};

export default getCabins;
