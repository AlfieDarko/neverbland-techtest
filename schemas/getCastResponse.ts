import { z } from "zod";

const ImageSchema = z
  .object({
    medium: z.union([z.string(), z.null()]).optional(),
    original: z.union([z.string(), z.null()]).optional(),
  })
  .nullable()
  .optional();

const SelfLinkSchema = z
  .object({
    href: z.union([z.string(), z.null()]).optional(),
  })
  .nullable()
  .optional();

const LinksSchema = z
  .object({
    self: SelfLinkSchema,
  })
  .nullable()
  .optional();

const CountrySchema = z
  .object({
    name: z.union([z.string(), z.null()]).optional(),
    code: z.union([z.string(), z.null()]).optional(),
    timezone: z.union([z.string(), z.null()]).optional(),
  })
  .nullable()
  .optional();

const PersonSchema = z
  .object({
    id: z.number().optional(),
    url: z.union([z.string(), z.null()]).optional(),
    name: z.union([z.string(), z.null()]).optional(),
    country: CountrySchema,
    birthday: z.union([z.string(), z.null()]).optional(),
    deathday: z.union([z.string(), z.null()]).optional(),
    gender: z.union([z.string(), z.null()]).optional(),
    image: ImageSchema,
    updated: z.union([z.number(), z.null()]).optional(),
    _links: LinksSchema,
  })
  .nullable()
  .optional();

const CharacterSchema = z
  .object({
    id: z.number().optional(),
    url: z.union([z.string(), z.null()]).optional(),
    name: z.union([z.string(), z.null()]).optional(),
    image: ImageSchema,
    _links: LinksSchema,
  })
  .nullable()
  .optional();

const MainCastSchema = z.array(
  z
    .object({
      person: PersonSchema,
      character: CharacterSchema,
      self: z.union([z.boolean(), z.null()]).optional(),
      voice: z.union([z.boolean(), z.null()]).optional(),
    })
    .nullable()
    .optional()
);

export default MainCastSchema;
