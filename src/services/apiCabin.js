import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  let { data, error } = await supabase.from("cabin").select("*");

  if (error) {
    console.log(error.message);
    throw new Error("There was an error loading the cabins");
  }

  return data;
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
  const hasImagePath = newCabin.image?.startsWith(supabaseUrl);

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
