import { zodResolver } from '@hookform/resolvers/zod'
import type { Wallet } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { WalletSchema } from '../schema'
import { api } from '@/trpc/react'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import FormWallet from './form-wallet'
import { ModalDestroyWallet } from './modal-destroy-wallet'
import { Plus } from 'lucide-react'

type props = {
  variant: 'add' | 'edit'
  data?: Partial<Wallet>
}
export default function ModalWallet({ data, variant }: props) {
  const [open, setOpen] = useState(false)
  const utils = api.useUtils()

  const form = useForm({
    resolver: zodResolver(WalletSchema),
    defaultValues: {
      name: '',
    },
  })

  useEffect(() => {
    if (open && data) {
      form.reset({
        name: data.name,
      })
    }
  }, [open, data])

  const create = api.wallet.create.useMutation({
    onSuccess: () => {
      setOpen(false)
      form.reset()
      utils.wallet.invalidate()
    },
  })
  const update = api.wallet.update.useMutation({
    onSuccess: () => {
      setOpen(false)
      form.reset()
      utils.wallet.invalidate()
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {variant === 'edit' ? (
          <p>{data?.name}</p>
        ) : (
          <Button variant="secondary" size='sm' >
            <Plus size={18} strokeWidth={3}/>
            New
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Wallet</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <FormWallet
          form={form}
          onSubmit={(values) =>
            variant === 'add'
              ? create.mutate(values)
              : data?.id && update.mutate({ ...values, id: data?.id })
          }
          onCancel={() => setOpen(false)}
          destroy={
            data?.id && (
              <ModalDestroyWallet
                id={data.id}
                callback={() => setOpen(false)}
              />
            )
          }
        />
      </DialogContent>
    </Dialog>
  )
}
