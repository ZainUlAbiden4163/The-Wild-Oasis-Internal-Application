import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log("---ERROR COMING FROM getCabins Function---", error);
    throw new Error("Cabins Could not be Loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log("---ERROR COMING FROM deleteCabin Function---", error);
    throw new Error("Cabins Could not be Deleted");
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://tqacfbpvivjqriaczssk.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg

  /// Create a Cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select(); // important!;

  if (error) {
    console.log("---ERROR COMING FROM createCabin Function---", error);
    throw new Error("Cabins Could not be Created");
  }

  // upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete cabin if there is problem uploading image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.log("---ERROR COMING FROM createCabin Function---", storageError);
    throw new Error("Cabins Image could not be uploaded");
  }
  return data;
}
