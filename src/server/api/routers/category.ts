import { readAll } from "~/features/category/api";
import { createTRPCRouter } from "../trpc";

export const categoryRouter = createTRPCRouter({
  readAll,
});
