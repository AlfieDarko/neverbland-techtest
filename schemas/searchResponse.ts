import { z } from "zod";

// Schedule
const ScheduleSchema = z.object({
  time: z.string().optional(),
  days: z.array(z.string()).optional(),
});

const RatingSchema = z.object({
  average: z.number().nullable(),
});

const NetworkSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
});

const ImageSchema = z.object({
  medium: z.string().optional(),
  original: z.string().optional(),
});

const SimplifiedShowSchema = z.object({
  id: z.number(),
  url: z.string(),
  name: z.string(),
  status: z.string(),
  genres: z.array(z.string()),
  schedule: ScheduleSchema.optional().nullable(),
  rating: RatingSchema.optional(),
  network: NetworkSchema.nullable().optional().nullable(),
  image: ImageSchema.optional().nullable(),
  summary: z.string().optional().nullable(),
  _links: z.unknown(),
});

const SimplifiedTvShowSearchResponseSchema = z.array(
  z.object({
    score: z.number(), // how well this item matches the search query
    show: SimplifiedShowSchema,
  })
);

export default SimplifiedTvShowSearchResponseSchema;
