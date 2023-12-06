import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { z } from "zod";
import SearchResponseArraySchema from "../../schemas/searchResponse";

type ValidSearchResponse = z.infer<typeof SearchResponseArraySchema>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    return res
      .status(400)
      .json({ message: "Missing or invalid query parameter." });
  }

  try {
    const response = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${query}`
    );

    const validatedData: ValidSearchResponse = SearchResponseArraySchema.parse(
      response.data
    );

    return res.status(200).json(validatedData);
  } catch (error) {
    console.log({ error });
    if (error instanceof z.ZodError) {
      console.error({ error });
      return res
        .status(500)
        .json({ message: "Invalid data from external API." });
    } else {
      return res.status(500).json("Unknown Error");
    }
  }
}
