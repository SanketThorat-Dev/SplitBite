import { supabase } from "./supabase";

export async function getRoommates() {
  const { data, error } = await supabase
    .from("roommates")
    .select("id,name,avatar")
    .order("name");

  if (error) throw error;

  return data;
}