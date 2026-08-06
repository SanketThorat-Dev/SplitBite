import { supabase } from "./supabase";

export async function logConsumption(
  roommateId,
  batchId,
  quantity
) {
  const { data, error } = await supabase.rpc("log_consumption", {
    roommate_uuid: roommateId,
    batch_uuid: batchId,
    consumed_quantity: quantity,
  });

  if (error) {
    throw error;
  }

  return data;
}