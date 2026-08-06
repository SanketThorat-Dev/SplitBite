import { supabase } from "./supabase";

export async function verifyPin(roommateId, pin) {
  const { data, error } = await supabase.rpc("verify_pin", {
    roommate_uuid: roommateId,
    entered_pin: pin,
  });

  if (error) throw error;

  return data.length ? data[0] : null;
}