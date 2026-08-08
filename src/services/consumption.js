import { supabase } from "./supabase";

export async function logConsumption(
  roommateId,
  quantity
) {
  const { data, error } = await supabase.rpc(
    "log_consumption_fifo",
    {
      p_roommate_id: roommateId,
      p_quantity: quantity,
    }
  );

  if (error) {
    throw error;
  }

  return data;
}