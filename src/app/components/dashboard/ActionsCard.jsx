import { useTranslation } from '@/app/context/TranslationContext'
import { Button } from '@/components/ui/button'
import React from 'react'

function ActionsCard({card}) {
  const {t} = useTranslation()
  return (
<div className="h-[200px] bg-Lightbg dark:bg-cardbgDark rounded-2xl p-4 shadow-md dark:shadow-none overflow-x-auto transition-all duration-300">
  <div className="flex items-center justify-between mb-2">
    <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
      {card.icon && (
        <span className="text-primary-500 dark:text-primary-300 ">
          {card.icon()}
        </span>
      )}
      <span>{t(card.title)}</span>
    </h3>
    <div className="flex space-x-2">
      {card?.actions?.map((action, idx) => (
        <Button
          key={idx}
          onClick={action.onClick}
          className="text-text_link_active_l bg-dark_link_active hover:bg-dark_link_active_hover text-sm px-3 py-1 rounded-lg transition-all duration-200"
        >
          {t(action.name)}
        </Button>
      ))}
    </div>
  </div>

  <p className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 mb-2">{t(card.subTitle)|| card.number}</p>

  {card.percent && (
    <p
      className={`text-sm font-medium ${
        card.percent.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      }`}
    >
      {card.percent}
    </p>
  )}

  <p className="text-gray-700 dark:text-gray-400 text-sm mt-2 leading-relaxed">
    {t(card.description)}
  </p>
  {card.chart && card.chart()}
</div>
  )
}

export default ActionsCard