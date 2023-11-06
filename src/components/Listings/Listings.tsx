import cn from 'classnames'
import { useAppContext } from '@/context/AppContext'
import { useModalContext } from '@/context/ModalContext'
import { calculateTotalByTimePeriod } from '@/helpers/calculateTotalByTimePeriod'
import { ExpenseType, IncomeType } from '@/types/context'
import { categories } from '@/data/categories'
import { CheckCircleIcon, PencilIcon } from '@heroicons/react/24/outline'

export const Listings = ({ currentTab }: { currentTab: 'expenses' | 'income' }) => {
  const { setModalOpen, setEditModalId } = useModalContext()
  const { totalExpensesArray, expensesArrayFilter, totalIncomeArray, setTotalExpensesArray, setTotalIncomeArray } =
    useAppContext()
  const expensesArrayToMap = expensesArrayFilter
    ? totalExpensesArray.filter((entry) => entry.category === expensesArrayFilter)
    : totalExpensesArray
  const arrayToRender = currentTab === 'expenses' ? expensesArrayToMap : totalIncomeArray

  const toggleActive = (id: string) => {
    const arrayToMap: ExpenseType[] | IncomeType[] = currentTab === 'expenses' ? totalExpensesArray : totalIncomeArray
    const updatedArray: ExpenseType[] | IncomeType[] = arrayToMap.map((entry) => {
      if (entry.id === id) {
        return {
          ...entry,
          active: !entry.active,
        }
      }

      return entry
    })

    currentTab === 'expenses'
      ? setTotalExpensesArray(updatedArray as ExpenseType[])
      : setTotalIncomeArray(updatedArray as IncomeType[])
    localStorage.setItem(currentTab === 'expenses' ? 'app_expenses' : 'app_income', JSON.stringify(updatedArray))
  }

  return (
    <>
      <CategoryFilters arrayToRender={currentTab === 'expenses' ? totalExpensesArray : totalIncomeArray} />
      <div className="flex flex-col gap-4">
        {arrayToRender.map((entry: ExpenseType | IncomeType) => (
          <Listing
            key={entry.id}
            currentTab={currentTab}
            entry={entry}
            toggleActive={() => toggleActive(entry.id)}
            onEdit={() => {
              setModalOpen(true)
              setEditModalId(entry.id)
            }}
          />
        ))}
      </div>
    </>
  )
}

const Listing = ({
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
  const Icon = categories.find((category) => category.value === entry.category)?.icon
  console.log('icon', Icon)
  const { totalIncomeArray, currentTimePeriod } = useAppContext()
  const totalIncome = totalIncomeArray.reduce((acc, income) => (income.active ? acc + income.amount : acc), 0)
  const percentageOfIcome = Math.round((entry.amount / totalIncome) * 100 * 100) / 100
  const percentageDisplay = Number.isFinite(percentageOfIcome) ? `${percentageOfIcome}%` : '0%'
  const entryAmount = calculateTotalByTimePeriod(entry.amount, currentTimePeriod).toFixed(2)
  const percentageColour = currentTab === 'expenses' ? 'bg-red-300' : 'bg-green-300'

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 p-4 bg-stone-800',
        entry.active ? 'text-white' : 'text-gray-600'
      )}
    >
      <div className="flex w-full gap-4 items-center">
        {(entry as ExpenseType).category && Icon && (
          <div className="w-content">
            <div className="text-xs uppercase w-5 h-5" aria-label={`Category: ${(entry as ExpenseType).category}`}>
              <Icon className="w-full h-full" />
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row w-full md:items-center gap-2">
          <div className="flex flex-1 items-center justify-between">
            <span className="text-sm font-italic uppercase">{entry.name}</span>
            <span className="text-sm font-italic">${entryAmount}</span>
          </div>

          <div className="flex-1 flex items-center justify-center gap-4">
            <div className="w-full md:w-1/2 h-1 bg-gray-500">
              <div
                style={{ width: `${percentageOfIcome >= 100 ? 100 : percentageOfIcome}%` }}
                className={cn('h-full transition-all duration-500', entry.active ? percentageColour : 'bg-gray-400')}
              ></div>
            </div>
            <span className="text-xs font-italic">{percentageDisplay}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <button onClick={toggleActive} className="focus:outline-none w-5 h-5">
          <CheckCircleIcon className={entry.active ? 'text-green-300' : 'text-gray-400'} />
        </button>
        <button className="focus:outline-none w-5 h-5" onClick={onEdit}>
          <PencilIcon className="text-gray-400" />
        </button>
      </div>
    </div>
  )
}

const CategoryFilters = ({ arrayToRender }: { arrayToRender: ExpenseType[] | IncomeType[] }) => {
  const { expensesArrayFilter, setExpensesArrayFilter } = useAppContext()
  const allCategoriesInExpenses = Array.from(new Set(arrayToRender.map((expense) => expense.category)))
  const allCategories = allCategoriesInExpenses
    .map((category) => categories.find((c) => c.value === category))
    .filter((category) => category)

  if (!allCategories.length) return null

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-2">
        <span className="font-italic uppercase">Categories</span>
        <div className="flex flex-wrap gap-2">
          {allCategories.map((category) => {
            if (!category) return null
            return (
              <button
                key={category.value}
                className={cn(
                  'flex items-center justify-center bg-stone-800 font-light uppercase font-italic text-sm',
                  expensesArrayFilter === category.value ? 'text-green-300' : 'text-white'
                )}
                onClick={() => {
                  if (expensesArrayFilter === category.value) {
                    setExpensesArrayFilter('')
                    return
                  }

                  setExpensesArrayFilter(category.value)
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
