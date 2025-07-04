import {
  create,
  destroy,
  readAll,
  update,
  read,
} from "@/features/transaction/api";
import { createTRPCRouter } from "../trpc";

export const transactionRouter = createTRPCRouter({
  readAll,
  create,
  update,
  destroy,
  read,
});
