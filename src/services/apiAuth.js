import supabase, { supabaseUrl } from "./supabase";

export const login = async (email, password) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data: user, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

export const signUp = async (email, password, fullName) => {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateUser = async ({ fullName, avatar, password }) => {
  // get the password or fullname and update the user
  let updatedData;
  if (password) updatedData = { password };
  if (fullName) updatedData = { data: { fullName } };

  const { data, error: updateError } = await supabase.auth.updateUser(
    updatedData
  );

  if (updateError) throw new Error(updateError.message);

  if (!avatar) return data;

  // upload the avatar to the bucket if it is received
  const fileName = `avatar-${Date.now()}-${Math.random()}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar[0]);

  if (updateError) throw new Error(uploadError.message);

  // update the user with the avatar path
  const { data: userData, error: updateAvatarError } =
    await supabase.auth.updateUser({ data: { avatar: imagePath } });

  if (updateAvatarError) throw new Error(updateAvatarError.message);

  return userData;
};
