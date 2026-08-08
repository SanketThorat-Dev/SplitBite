import { supabase } from "./supabase";

export async function getActiveBatch() {
  const { data, error } = await supabase
    .from("inventory_batches")
    .select(`
      id,
      quantity,
      remaining_quantity,
      price,
      purchase_date,
      inventory_items (
        id,
        name,
        unit
      )
    `)
    .eq("active", true)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function getBatchPriceHistory() {
  const { data, error } = await supabase
    .from("inventory_batches")
    .select(`
      id,
      quantity,
      price,
      purchase_date,
      inventory_items (
        name,
        unit
      )
    `)
    .order("purchase_date", { ascending: false });

  if (error) throw error;

  return data;
}