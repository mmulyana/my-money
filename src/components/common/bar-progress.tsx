type props = {
  color: string
  percentage: number
}

export default function BarProgress({ color, percentage }: props) {
  return (
    <div className="flex h-6 w-full items-center overflow-hidden rounded-full bg-[#f5f5f5]">
      <div
        className="flex h-full items-center rounded-full pl-2 text-xs text-white"
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
          transition: 'width 0.3s ease',
        }}
      >
        {percentage}%
      </div>
    </div>
  )
}
