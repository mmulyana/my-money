'use client'

import { TrendingDown, TrendingUp } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'

import ColorPicker from '~/components/common/color-picker'
import RadioCard from '~/components/common/radio-card'
import { IconPicker } from '~/components/common/icon-picker'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'

import type { Category } from '../schema'

type props = {
  form: UseFormReturn<Category>
  onSubmit: (values: Category) => void
  id?: string
  onCancel: () => void
}

const OPTIONS = [
  {
    value: 'EXPENSE',
    title: 'Expense',
    icon: <TrendingDown size={20} className="mt-0.5 text-red-400" />,
  },
  {
    value: 'INCOME',
    title: 'Income',
    icon: <TrendingUp size={20} className="mt-0.5" />,
  },
]

export default function FormCategory({ form, onSubmit, id, onCancel }: props) {
  const { control, handleSubmit } = form

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <div className="flex items-start gap-2">
            <FormField
              control={control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <IconPicker
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  {OPTIONS.map((option) => (
                    <RadioCard
                      key={option.value}
                      value={option.value}
                      title={option.title}
                      selected={field.value === option.value}
                      onSelect={field.onChange}
                      icon={option.icon}
                    />
                  ))}
                </div>
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
              <FormControl>
                <ColorPicker
                  value={field.value}
                  onValueChange={field.onChange}
                />
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
