import { useRef } from 'react'

import { useTurntable } from './useTurntable'
import { generateSegmentPath, getTextProps } from '@/utils/wheel'

function LuckyWheel() {
  const wheelRef = useRef<HTMLDivElement>(null)
  const { rotation, size, spin } = useTurntable()

  return (
    <section className="relative">
      {/* Wheel */}
      <div
        ref={wheelRef}
        className="relative transition-transform duration-[3000ms] ease-out"
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center',
        }}
      >
        <svg width={size} height={size} className="drop-shadow-lg">
          <Segment />

          {/* Center circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r="20"
            fill="#333"
            stroke="#fff"
            strokeWidth="3"
            onClick={spin}
          />
        </svg>
      </div>

      {/* Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
        <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-red-500 drop-shadow-md" />
      </div>
    </section>
  )
}

function Segment() {
  const { options, segmentAngle } = useTurntable()
  if (options.length === 0) return null

  if (options.length === 1) {
    return (
      <>
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="#666"
          stroke="#fff"
          strokeWidth="3"
        />
        <text
          {...getTextProps(0, segmentAngle, { keepUpright: true })}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white font-medium text-sm pointer-events-none"
          style={{
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          {options[0].label}
        </text>
      </>
    )
  }

  return (
    <>
      {
        options.map((option, index) => (
          <g key={option.id}>
            <path
              d={generateSegmentPath(index, segmentAngle)}
              fill={`var(--chart-${index % 5})`}
              stroke="#ffffff"
              strokeWidth="2"
            />
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white font-medium text-sm pointer-events-none"
              {...getTextProps(index, segmentAngle)}
              style={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              {option.label}
            </text>
          </g>
        ))
      }
    </>
  )
}

export default LuckyWheel
