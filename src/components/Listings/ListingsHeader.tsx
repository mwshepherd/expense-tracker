import cn from 'classnames'
import { useAppContext } from '@/context/AppContext'
import { calculateEntryTotal } from '@/helpers/calculateEntryTotal'
import { Container } from '../Container/Container'

export const ListingsHeader = () => {
  const { totalExpensesArray, expensesArrayFilters, totalIncomeArray, currentTimePeriod, setCurrentSortOrder } = useAppContext()
  const totalIncome = totalIncomeArray.reduce((acc, income) => (income.active ? acc + calculateEntryTotal(income.amount, income.frequency, currentTimePeriod) : acc), 0)
  const expensesArrayToMap = expensesArrayFilters.length ? totalExpensesArray.filter((entry) => expensesArrayFilters.includes(entry.category.value)) : totalExpensesArray
  const totalExpenses = expensesArrayToMap.reduce((acc, expense) => (expense.active ? acc + calculateEntryTotal(expense.amount, expense.frequency, currentTimePeriod) : acc), 0)
  const totalExpenesLabel = totalExpenses.toFixed(2)
  const percentageOfIcome = Math.round((totalExpenses / totalIncome) * 100 * 100) / 100
  const percentageIndicator = Number.isFinite(percentageOfIcome) ? percentageOfIcome : 0
  const percentageDisplay = Number.isFinite(percentageOfIcome) ? `${percentageOfIcome}%` : '0%'
  const headerLabel = expensesArrayFilters.length ? 'Filtered Expenses' : 'All Expenses'

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentSortOrder(e.target.value)
  }

  return (
    <div className="bg-black border-b border-stone-800">
      <Container>
        <div className="flex py-2 md:p-4 gap-4">
          <div className="flex flex-col md:flex-row w-full md:items-center md:gap-2">
            <div className="flex flex-1 items-center justify-between">
              <div className="w-40 sm:w-auto overflow-hidden truncate md:-ml-4">
                <span className="text-sm font-italic uppercase">{headerLabel}</span>
              </div>

              <span className="text-sm font-italic">${totalExpenesLabel}</span>
            </div>

            <div className="flex-1 flex items-center justify-center gap-4">
              <div className="w-full md:w-1/2 h-1 bg-gray-500">
                <div style={{ width: `${percentageIndicator >= 100 ? 100 : percentageIndicator}%` }} className={cn('h-full transition-all duration-500', 'bg-red-300')}></div>
              </div>
              <span className="text-xs font-italic w-16 md:w-12 text-right">{percentageDisplay}</span>
            </div>
          </div>

          <div className="flex justify-end -mr-3 ml-2">
            <select className="block appearance-none text-xs bg-transparent text-white focus:outline-none uppercase font-italic text-center" onChange={handleSortOrderChange}>
              <option value="default">Default</option>
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
              <option value="category">Category</option>
              <option value="active">Active</option>
            </select>
          </div>
        </div>
      </Container>
    </div>
  )
}
