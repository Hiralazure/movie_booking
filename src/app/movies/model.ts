import { z } from "zod";

export const moviePayload = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const updateMoviePayload = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
  })
  .refine((data) => data.name || data.description, {
    message: "At least one field (name or description) must be provided",
  });
