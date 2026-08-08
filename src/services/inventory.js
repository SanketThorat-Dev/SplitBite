import { supabase } from "./supabase";

export async function getAvailableBatches() {
  const { data, error } = await supabase
    .from("inventory_batches")
    .select(`
      id,
      quantity,
      remaining_quantity,
      price,
      purchase_date,
      active,
      inventory_items (
        id,
        name,
        unit
      )
    `)
    .gt("remaining_quantity", 0)
    .order("purchase_date", { ascending: true });

  if (error) throw error;

  console.log("Inventory batches:", data);

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