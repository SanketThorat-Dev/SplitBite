import { supabase } from "./supabase";

export async function getMonthlySummary() {
  const { data, error } =
    await supabase.rpc("get_monthly_summary");

  if (error) throw error;

  return data;
}

export async function getMonthlyBatchSummary() {
  const { data, error } =
    await supabase.rpc("get_monthly_batch_summary");

  if (error) throw error;

  return data;
}
