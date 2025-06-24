import { type UseFormReturn } from "react-hook-form";
import type { TransactionFormSchema } from "../schema";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { ModalDestroyTransaction } from "./modal-destroy";

type Props = {
  form: UseFormReturn<TransactionFormSchema>;
  onSubmit: (values: TransactionFormSchema) => void;
  submitLabel?: string;
  categories?: { id: string; name: string }[];
  id?: string;
};

export const TransactionForm = ({
  form,
  onSubmit,
  submitLabel = "Save",
  categories = [],
  id,
}: Props) => {
  const { register, handleSubmit, formState } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            {...register("amount")}
            className="w-full rounded border p-2"
          />
          {formState.errors.amount && (
            <p className="text-sm text-red-500">
              {formState.errors.amount.message}
            </p>
          )}
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium">Note</label>
          <input
            type="text"
            {...register("note")}
            className="w-full rounded border p-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            {...register("categoryId")}
            className="w-full rounded border p-2"
          >
            <option value="">-- Select category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {formState.errors.categoryId && (
            <p className="text-sm text-red-500">
              {formState.errors.categoryId.message}
            </p>
          )}
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select {...register("type")} className="w-full rounded border p-2">
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full rounded border p-2"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          {id && <ModalDestroyTransaction id={id} />}
          <Button type="submit" disabled={formState.isSubmitting}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
