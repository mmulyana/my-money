import type { UseFormReturn } from 'react-hook-form'
import type { Budget } from '../schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ComboboxCategory } from '@/features/category/components/combobox-category'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/common/date-picker'

type props = {
  form: UseFormReturn<Budget>
  onSubmit: (values: Budget) => void
  onCancel: () => void
}
export default function FormBudget({ form, onSubmit, onCancel }: props) {
  const { control, handleSubmit } = form

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <ComboboxCategory
                defaultValue={field.value}
                onValueChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <DatePicker
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <DatePicker
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between">
          <div></div>
          <div className="flex items-center gap-4">
            <Button onClick={onCancel} type="button" variant="outline">
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
