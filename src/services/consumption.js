import { supabase } from "./supabase";

export async function logConsumption(
  roommateId,
  quantity,
  consumedOn
) {
  const { data, error } = await supabase.rpc(
    "log_consumption_fifo",
    {
      p_roommate_id: roommateId,
      p_quantity: quantity,
      p_consumed_on: consumedOn,
    }
  );

  if (error) {
    throw error;
  }

  return data;
}