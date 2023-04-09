import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { ListingRouter } from "./routers/listing";
import { userRouter } from "./routers/user";
import { BookingRouter } from "./routers/booking";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  listing: ListingRouter,
  user: userRouter,
  booking: BookingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
