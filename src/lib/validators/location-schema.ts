import { z } from "zod";

export const formLocation = z.object({
    location: z
      .string()
      .min(1, { message: "Please enter a location" })
      .max(50, { message: "Location is too long" }),
  });
  
export type FormLocation = z.infer<typeof formLocation>;
  