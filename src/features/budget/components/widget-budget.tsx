import { BatteryCharging, Bed, Car, Hamburger } from 'lucide-react'
import CircularProgress from '~/components/common/circular-progress'

export default function WidgetBudget() {
  return (
    <div className="border-[#EDEDED grid grid-cols-2 gap-4 rounded-xl border bg-white p-6 lg:grid-cols-3">
      <div className="flex flex-col items-center space-y-2 rounded-lg pb-1 hover:bg-gray-100/60">
        <CircularProgress
          color="#2562E8"
          progress={23}
          icon={<Car size={28} />}
          size={110}
          strokeWidth={8}
          className="p-6"
        />
        <p className="z-10 -mt-3.5 text-sm">Transportation</p>
      </div>
      <div className="flex flex-col items-center space-y-2 rounded-lg pb-1 hover:bg-gray-100/60">
        <CircularProgress
          color="#3CC58C"
          progress={80}
          icon={<Bed size={28} />}
          size={110}
          strokeWidth={8}
          className="p-6"
        />
        <p className="-mt-3.5 text-sm">Rent</p>
      </div>
      <div className="flex flex-col items-center space-y-2 rounded-lg pb-1 hover:bg-gray-100/60">
        <CircularProgress
          color="#3CC0C5"
          progress={49}
          icon={<BatteryCharging size={28} />}
          size={110}
          strokeWidth={8}
          className="p-6"
        />
        <p className="-mt-3.5 text-sm">Electricity</p>
      </div>
      <div className="flex flex-col items-center space-y-2 rounded-lg pb-1 hover:bg-gray-100/60">
        <CircularProgress
          color="#42A7EA"
          progress={23}
          icon={<Hamburger size={28} />}
          size={110}
          strokeWidth={8}
          className="p-6"
        />
        <p className="-mt-3.5 text-sm">Food</p>
      </div>
    </div>
  )
}
