import cn from 'classnames'
import { useAppContext } from '@/context/AppContext'
import { expensesCategories } from '@/data/expensesCategories'
import { calculateEntryTotal } from '@/helpers/calculateEntryTotal'
import { ExpenseType, IncomeType } from '@/types/context'
import { CheckCircleIcon, PencilIcon } from '@heroicons/react/24/outline'
import { incomeCategories } from '@/data/incomeCategories'

export const Listing = ({
  currentTab,
  entry,
  toggleActive,
  onEdit,
}: {
  currentTab: 'expenses' | 'income'
  entry: ExpenseType | IncomeType
  toggleActive: () => void
  onEdit: () => void
}) => {
  const { totalIncomeArray, currentTimePeriod } = useAppContext()
  const totalIncome = totalIncomeArray.reduce((acc, income) => (income.active ? acc + calculateEntryTotal(income.amount, income.frequency, currentTimePeriod) : acc), 0)
  const percentageOfIcome = entry.active ? Math.round((calculateEntryTotal(entry.amount, entry.frequency, currentTimePeriod) / totalIncome) * 100 * 100) / 100 : 0
  const percentageDisplay = Number.isFinite(percentageOfIcome) ? `${percentageOfIcome}%` : '0%'
  const calculatedAmount = calculateEntryTotal(entry.amount, entry.frequency, currentTimePeriod).toFixed(2)
  const currentCategories = currentTab === 'expenses' ? expensesCategories : incomeCategories
  const Icon = currentCategories.find((category) => category.value === entry.category.value)?.icon
  const percentageColour = currentTab === 'expenses' ? 'bg-red-300' : 'bg-green-300'

  return (
    <div className={cn('flex items-center justify-between gap-4 p-2 md:p-4 bg-stone-800', entry.active ? 'text-white' : 'text-gray-600')}>
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col md:flex-row w-full md:items-center gap-1">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              {entry.category && Icon && (
                <div className="w-content">
                  <div className="text-xs uppercase w-5 h-5" aria-label={`Category: ${entry.category}`}>
                    <Icon className="w-full h-full" />
                  </div>
                </div>
              )}
              <div className="w-40 sm:w-auto overflow-hidden truncate">
                <span className="text-sm font-italic uppercase">{entry.name}</span>
              </div>
            </div>

            <span className="text-sm font-italic">${calculatedAmount}</span>
          </div>

          <div className="flex-1 flex items-center justify-center gap-4">
            <div className="w-full md:w-1/2 h-1 bg-gray-500">
              <div
                style={{ width: `${percentageOfIcome >= 100 ? 100 : percentageOfIcome}%` }}
                className={cn('h-full transition-all duration-500', entry.active ? percentageColour : 'bg-gray-400')}
              ></div>
            </div>
            <span className="text-xs font-italic w-16 md:w-12 text-right">{percentageDisplay}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-end gap-2 md:gap-4">
        <button onClick={toggleActive} className="focus:outline-none w-5 h-5">
          <CheckCircleIcon className={entry.active ? 'text-green-300' : 'text-gray-400'} />
        </button>
        <button className="focus:outline-none w-4 h-4" onClick={onEdit}>
          <PencilIcon className="text-gray-400" />
        </button>
      </div>
    </div>
  )
}
