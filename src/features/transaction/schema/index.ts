import { z } from "zod";

export const transactionSchema = z.object({
  note: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  type: z.enum(["INCOME", "EXPENSE"]),
  date: z.coerce.date().optional(),
});

export type TransactionFormSchema = z.infer<typeof transactionSchema>;
