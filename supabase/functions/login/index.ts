import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  return new Response(
    JSON.stringify({
      message: "SplitBite login function is running!"
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
});