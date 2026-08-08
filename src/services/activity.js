import { supabase } from "./supabase";

export async function getTodayActivity() {
  const { data, error } = await supabase.rpc(
    "get_today_activity"
  );

  if (error) throw error;

  return data;
}

export async function getConsumptionHistory() {
  const { data, error } = await supabase.rpc(
    "get_consumption_history"
  );

  if (error) throw error;

  return data;
}