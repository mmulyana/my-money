type Props = {
  progress: number; // 0 - 100
  color?: string;
};

export default function ProgressBar({ progress, color = "#187D86" }: Props) {
  return (
    <div className="flex items-center gap-0.5 w-full">
      {/* Track */}
      <div className="flex-1 h-1.5 bg-[#ECECEC] rounded-full overflow-hidden">
        {/* Filled part */}
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
          }}
        />
      </div>

      {/* Label */}
      <span className="text-xs font-semibold text-foreground/50 w-[34px] text-right">
        {progress}%
      </span>
    </div>
  );
}
