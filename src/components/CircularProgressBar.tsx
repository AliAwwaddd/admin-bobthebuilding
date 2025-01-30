type CircularProgressBarProps = {
  progress: number // Percentage of completion (0-100)
  size?: number // Diameter of the circle
  strokeWidth?: number // Thickness of the progress stroke
}

export default function CircularProgressBar({
  progress,
  size = 50,
  strokeWidth = 4,
}: CircularProgressBarProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} className='relative'>
      {/* Background Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill='transparent'
        stroke='#e5e7eb' /* Gray background color */
      />
      {/* Progress Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill='transparent'
        stroke={
          progress === 100 ? '#22c55e' : '#3b82f6'
        } /* Green for complete, blue for progress */
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap='round'
        className='transition-all duration-300'
      />
      {/* Percentage Text */}
      <text
        x='50%'
        y='50%'
        dominantBaseline='middle'
        textAnchor='middle'
        className='fill-gray-800 text-xs font-medium'
      >
        {progress}%
      </text>
    </svg>
  )
}
