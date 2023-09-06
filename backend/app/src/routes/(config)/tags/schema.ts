import { z } from "zod";

export const newTag = z.object({
  tag: z.string(),
});
