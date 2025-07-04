import type { UseFormReturn } from 'react-hook-form'
import type { Wallet } from '../schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type props = {
  form: UseFormReturn<Wallet>
  onSubmit: (values: Wallet) => void
  onCancel: () => void
  destroy?: React.ReactNode
}
export default function FormWallet({
  form,
  onSubmit,
  onCancel,
  destroy,
}: props) {
  const { control, handleSubmit } = form
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <div>{destroy}</div>
          <div className="flex items-center gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
