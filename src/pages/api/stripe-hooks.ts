import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../libs/stripe-server";
import Cors from "micro-cors";
import { buffer } from "micro";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

export const config = { api: { bodyParser: false } };

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const reqBuffer = await buffer(req);
    const signature = req.headers["stripe-signature"];
    const signingSecret = "whsec_MsVbHaYV208omXIyX80QD7Cp6tR4ngQJ";

    try {
      if (signature) {
        const event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);

        console.log();
        console.log("Data isssss", event.data.object);
        console.log();
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: `Webhook error` });
    }

    res.send({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
export default cors(handler as any);
