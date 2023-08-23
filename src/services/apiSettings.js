import supabase from "./supabase";

export const getSettings = async () => {
  let { data, error } = await supabase.from("settings").select("*");

  if (error) {
    console.log(error);
    throw new Error("There was an error in fetching the sttings");
  }

  return data;
};

export const updateSettings = async (updatedSettings, id) => {
  console.log(updatedSettings, id);

  const { data, error } = await supabase
    .from("settings")
    .update(updatedSettings)
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cannot update settings");
  }

  return data;
};
