'use client'

import type { UseFormReturn } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import type { Category } from '../schema'

type props = {
  form: UseFormReturn<Category>
  onSubmit: (values: Category) => void
  id?: string
  onCancel: () => void
}

export default function FormCategory({ form, onSubmit, id, onCancel }: props) {
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
        <FormField
          control={control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input {...field} type="color" className='block w-10 px-2' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
