import { Button } from '@/components/ui/button'
import React from 'react'

function ActionsCard({card}) {
  return (
    <div className="h-[179px] min-h-max bg-Lightbg dark:bg-cardbgDark rounded-2xl px-2 pt-2 shadow-box_shadow dark:shadow-none overflow-x-auto">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">{card.icon()} {card.title}</h3>
      <span className="text-gray-500">
      {card?.actions?.map((action, idx) => (
          <Button
            key={idx}
            onClick={action.onClick}
            className="text-text_link_active bg-dark_link_active px-2 py-1 rounded"
          >
            {action.name}
          </Button>
        ))}
      </span>
    </div>
    <p className="text-2xl font-bold my-2">{card.number}</p>
    {card.percent && (
      <p className={`text-sm ${card.percent.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {card.percent}
      </p>
    )}
    <p className="text-gray-700 text-sm mb-2">{card.description}</p>
  </div>
  )
}

export default ActionsCard