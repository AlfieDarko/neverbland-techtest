import { NextApiRequest, NextApiResponse } from "next/types";
import axios from "axios";
import { z } from "zod";
import MainCastSchema from "../../schemas/getCastResponse";

type ValidCastResponse = z.infer<typeof MainCastSchema>;

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
      `https://api.tvmaze.com/shows/${query}/cast`
    );

    const validatedData: ValidCastResponse = MainCastSchema.parse(
      response.data
    );

    return res.status(200).json(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error:", error);
      return res
        .status(500)
        .json({ message: "Invalid data from external API." });
    } else {
      console.error("Unknown error:", error);
      return res.status(500).json({ message: "Unknown Error" });
    }
  }
}
