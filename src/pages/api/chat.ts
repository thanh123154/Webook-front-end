import type { NextApiRequest, NextApiResponse } from "next";

import { openai } from "../../libs";
import type { Override } from "../../types";

type RequestBody = {
  message: string;
};

type ApiRequest = Override<NextApiRequest, { body: RequestBody }>;

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(404).send("API NOT FOUND");

  const { message } = req.body;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    temperature: 0.6,
    max_tokens: 100,
  });

  return res.status(200).json({ data: completion.data.choices[0]?.text });
}
