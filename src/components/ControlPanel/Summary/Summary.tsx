import cn from 'classnames'
import { useAppContext } from '@/context/AppContext'
import { calculateEntryTotal } from '@/helpers/calculateEntryTotal'
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import NumAnim from '@/components/Number/Number'

export const Summary = () => {
  const { totalExpensesArray, totalIncomeArray, currentTimePeriod } = useAppContext()
  const totalExpenses = totalExpensesArray.reduce((acc, expense) => (expense.active ? acc + calculateEntryTotal(expense.amount, expense.frequency, currentTimePeriod) : acc), 0)
  const totalIncome = totalIncomeArray.reduce((acc, income) => (income.active ? acc + calculateEntryTotal(income.amount, income.frequency, currentTimePeriod) : acc), 0)
  const totalRemaining = totalIncome - totalExpenses
  const totalExpensesAsPercentage = (totalExpenses / totalIncome) * 100
  const totalRemainingAsPercentage = (totalRemaining / totalIncome) * 100
  const totalExpensesAsPercentageLabel = Number.isFinite(totalExpensesAsPercentage) ? totalExpensesAsPercentage : 0
  const totalRemainingAsPercentageLabel = Number.isFinite(totalRemainingAsPercentage) ? totalRemainingAsPercentage : 0

  return (
    <div>
      <div className="flex flex-col flex-1 text-white font-italic uppercase pb-1 md:pb-4">
        <span>Remaining</span>
        <div className={cn('flex items-end gap-2', totalRemaining >= 0 ? 'text-green-500' : 'text-red-500')}>
          <span className="text-[40px] leading-[36px]">
            $<NumAnim n={totalRemaining} />
          </span>
          <span className="inline-block">
            {totalRemaining >= 0 ? <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" /> : <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />}
          </span>
          <span className="text-xs">
            <NumAnim n={totalRemainingAsPercentageLabel} />%
          </span>
        </div>
      </div>
      <div className="pb-1 md:pb-4">
        <div className="flex items-center gap-2">
          <span className="font-italic uppercase">Income</span>
          {/* <span className="text-green-500">${totalIncome.toFixed(2)}</span> */}
          <span className="text-green-500">
            $<NumAnim n={totalIncome} />
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-italic uppercase">Expenses</span>
          <span className="text-red-500">
            $<NumAnim n={totalExpenses} />
          </span>
          <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
          <span className="text-red-500 text-xs">
            <NumAnim n={totalExpensesAsPercentageLabel} />%
          </span>
        </div>
      </div>
    </div>
  )
}
