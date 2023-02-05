import type { NextApiRequest, NextApiResponse } from "next";
import { type CreateImageRequestSizeEnum } from "openai";

import { openai } from "../../libs";
import type { Override } from "../../types";

type RequestBody = {
  message: string;
  n?: number;
  size?: CreateImageRequestSizeEnum;
};

type ApiRequest = Override<NextApiRequest, { body: RequestBody }>;

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(404).send("API NOT FOUND");

  try {
    const { message, n = 1, size = "512x512" } = req.body;

    const result = await openai.createImage({ prompt: `${message}`, n, size });

    const data = result.data.data.map((item) => item?.url || "");

    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
}
