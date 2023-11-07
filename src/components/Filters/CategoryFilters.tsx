import cn from 'classnames'
import { useAppContext } from '@/context/AppContext'
import { expensesCategories } from '@/data/expensesCategories'
import { ExpenseType, IncomeType } from '@/types/context'
import { incomeCategories } from '@/data/incomeCategories'

export const CategoryFilters = ({ currentTab, arrayToRender }: { currentTab: 'expenses' | 'income'; arrayToRender: ExpenseType[] | IncomeType[] }) => {
  const { expensesArrayFilters, setExpensesArrayFilters, incomeArrayFilters, setIncomeArrayFilters } = useAppContext()
  const allCategoriesInCurrentArray = arrayToRender.map((entry) => entry.category).filter((category, index, self) => self.findIndex((c) => c.value === category.value) === index)
  const allExpensesCategories = allCategoriesInCurrentArray.map((category) => expensesCategories.find((c) => c.value === category.value)).filter((category) => category)
  const allIncomeCategories = allCategoriesInCurrentArray.map((category) => incomeCategories.find((c) => c.value === category.value)).filter((category) => category)
  const allCategories = currentTab === 'expenses' ? allExpensesCategories : allIncomeCategories

  if (!allCategories.length) return null

  const handleExpenseFilter = (category: string) => {
    if (expensesArrayFilters.includes(category)) {
      setExpensesArrayFilters(expensesArrayFilters.filter((filter) => filter !== category))
      return
    }

    setExpensesArrayFilters([...expensesArrayFilters, category])
  }

  const handleIncomeFilter = (category: string) => {
    if (incomeArrayFilters.includes(category)) {
      setIncomeArrayFilters(incomeArrayFilters.filter((filter) => filter !== category))
      return
    }

    setIncomeArrayFilters([...incomeArrayFilters, category])
  }

  return (
    <div className="flex flex-col gap-4 pt-2 md:pt-4">
      <div className="flex flex-row gap-2">
        <span className="font-italic uppercase text-sm">Categories</span>
        <div className="flex flex-nowrap overflow-x-scroll gap-2">
          {allCategories.map((category) => {
            if (!category) return null
            const activeFilterCondition = currentTab === 'expenses' ? expensesArrayFilters.includes(category.value) : incomeArrayFilters.includes(category.value)
            return (
              <button
                key={category.value}
                className={cn('flex items-center justify-center bg-stone-800 font-light uppercase font-italic text-sm', activeFilterCondition ? 'text-green-300' : 'text-white')}
                onClick={() => {
                  if (currentTab === 'expenses') handleExpenseFilter(category.value)
                  if (currentTab === 'income') handleIncomeFilter(category.value)
                }}
              >
                {category.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
