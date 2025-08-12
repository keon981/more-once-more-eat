import React from 'react'

import type { TurntableOption } from '@/hooks/useTurntable'

interface Props extends TurntableOption {
  pathProps?: React.ComponentProps<'path'>
  textProps?: React.ComponentProps<'text'>
}

function SegmentLayer({ pathProps, textProps, label }: Props) {
  return (
    <g>
      <path
        stroke="#ffffff"
        strokeWidth="2"
        {...pathProps}
      />
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-white font-medium text-sm pointer-events-none"
        {...textProps}
        style={{
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        }}
      >
        {label}
      </text>
    </g>
  )
}

export default React.memo(SegmentLayer)
