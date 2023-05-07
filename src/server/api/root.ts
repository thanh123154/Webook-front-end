import { createTRPCRouter } from "./trpc";
import { ListingRouter } from "./routers/listing";
import { userRouter } from "./routers/user";
import { BookingRouter } from "./routers/booking";
import { stripeRouter } from "./routers/stripe";
import { AdminRouter } from "./routers/admin";
import { ReviewRouter } from "./routers/review";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  listing: ListingRouter,
  user: userRouter,
  booking: BookingRouter,
  review: ReviewRouter,
  stripe: stripeRouter,
  admin: AdminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
