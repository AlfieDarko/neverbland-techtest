import { z } from "zod";

const ResolutionsSchema = z
  .object({
    original: z
      .object({
        url: z.string().nullable().optional(),
        width: z.number().nullable().optional(),
        height: z.number().nullable().optional(),
      })
      .nullable()
      .optional(),
    medium: z
      .object({
        url: z.string().nullable().optional(),
        width: z.number().nullable().optional(),
        height: z.number().nullable().optional(),
      })
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

const BackgroundImageSchema = z.array(
  z
    .object({
      id: z.number().nullable().optional(),
      type: z.string().nullable().optional(),
      main: z.boolean().nullable().optional(),
      resolutions: ResolutionsSchema,
    })
    .nullable()
    .optional()
);

export default BackgroundImageSchema;
