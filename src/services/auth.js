import { supabase } from "./supabase";

export async function verifyPin(roommateId, pin) {
  const { data, error } = await supabase.rpc("verify_pin", {
    roommate_uuid: roommateId,
    entered_pin: pin,
  });

  if (error) throw error;

  return data.length ? data[0] : null;
}

export async function changePin(roommateId, currentPin, newPin) {
  const { data, error } = await supabase.rpc("change_pin", {
    roommate_uuid: roommateId,
    current_pin: currentPin,
    new_pin: newPin,
  });

  if (error) throw error;

  return data;
}