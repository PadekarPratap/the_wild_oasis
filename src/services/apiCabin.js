import { PAGE_SIZE } from "../components/shared/TablePagination";
import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async (page) => {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + (PAGE_SIZE - 1);

  let { data, error, count } = await supabase
    .from("cabin")
    .select("*", { count: "exact" })
    .range(from, to);

  if (error) {
    console.log(error.message);
    throw new Error("There was an error loading the cabins");
  }

  return { data, count };
};

export const deleteCabin = async (id) => {
  const { error, data } = await supabase.from("cabin").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("There was an error in deleting the cabin");
  }

  return data;
};

export const createCabin = async (newCabin) => {
  // to check whether we are creating an entirely new cabin or duplicating an existing cabin
  const hasImagePath = typeof newCabin.image === "string";

  let imageName;
  if (!hasImagePath) {
    imageName = `${Date.now()}-${newCabin.image[0].name}`.replaceAll("/", "");
  }
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  // creating a cabin
  const { data, error } = await supabase
    .from("cabin")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Unable to create a cabin.");
  }

  // if we are duplicating an existing cabin, we don't need to upload the image
  if (hasImagePath) return data;

  // upload the cabin image in the bucket
  const { error: imageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image[0]);

  if (imageError) {
    console.log(imageError);
    await supabase.from("cabin").delete().eq("id", data.id);
    throw new Error("There was an error in uploading the image");
  }

  return data;
};

export const editCabin = async (updatedCabin, id) => {
  const { data, error } = await supabase
    .from("cabin")
    .update(updatedCabin)
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new Error("There was an error updating the Cabin");
  }

  return data;
};
