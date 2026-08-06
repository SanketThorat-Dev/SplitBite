import { supabase } from "./supabase";

export async function createNewBatch(quantity, price) {
  const { data, error } = await supabase.rpc(
    "create_new_batch",
    {
      total_quantity: quantity,
      total_price: price,
    }
  );

  if (error) throw error;

  return data;
}