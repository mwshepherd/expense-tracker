import cn from 'classnames'
import { useAppContext } from '@/context/AppContext'
import { calculateTotalByTimePeriod } from '@/helpers/calculateTotalByTimePeriod'
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'

export const Summary = () => {
  const { totalExpensesArray, totalIncomeArray, currentTimePeriod } = useAppContext()

  const totalExpenses = calculateTotalByTimePeriod(
    totalExpensesArray.reduce((acc, expense) => (expense.active ? acc + expense.amount : acc), 0),
    currentTimePeriod
  )
  const totalIncome = calculateTotalByTimePeriod(
    totalIncomeArray.reduce((acc, income) => (income.active ? acc + income.amount : acc), 0),
    currentTimePeriod
  )
  const totalRemaining = totalIncome - totalExpenses

  const totalExpensesAsPercentage = (totalExpenses / totalIncome) * 100
  const totalRemainingAsPercentage = (totalRemaining / totalIncome) * 100
  const totalExpensesAsPercentageLabel = Number.isFinite(totalExpensesAsPercentage) ? totalExpensesAsPercentage.toFixed(2) : 0
  const totalRemainingAsPercentageLabel = Number.isFinite(totalRemainingAsPercentage) ? totalRemainingAsPercentage.toFixed(2) : 0

  return (
    <div>
      <div className="flex flex-col flex-1 text-white font-italic uppercase pb-1 md:pb-4">
        <span>Remaining</span>
        <div className={cn('flex items-end gap-2', totalRemaining >= 0 ? 'text-green-500' : 'text-red-500')}>
          <span className="text-[40px] leading-[36px]">${totalRemaining.toFixed(2)}</span>
          <span className="inline-block">
            {totalRemaining >= 0 ? <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" /> : <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />}
          </span>
          <span className="text-xs">{totalRemainingAsPercentageLabel}%</span>
        </div>
      </div>
      <div className="pb-1 md:pb-4">
        <div className="flex items-center gap-2">
          <span className="font-italic uppercase">Income</span>
          <span className="text-green-500">${totalIncome.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-italic uppercase">Expenses</span>
          <span className="text-red-500">${totalExpenses.toFixed(2)}</span>
          <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
          <span className="text-red-500 text-xs">{totalExpensesAsPercentageLabel}%</span>
        </div>
      </div>
    </div>
  )
}
