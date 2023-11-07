import { useAppContext } from '@/context/AppContext'
import { useModalContext } from '@/context/ModalContext'
import { ExpenseType, IncomeType } from '@/types/context'
import { Listing } from './Listing'
import { Container } from '../Container/Container'
import { CategoryFilters } from '../Filters/CategoryFilters'

export const Listings = ({ currentTab }: { currentTab: 'expenses' | 'income' }) => {
  const { controlPanelRef } = useAppContext()
  const { setModalOpen, setEditModalId } = useModalContext()
  const { totalExpensesArray, expensesArrayFilters, totalIncomeArray, incomeArrayFilters, setTotalExpensesArray, setTotalIncomeArray } = useAppContext()

  const expensesArrayToMap = expensesArrayFilters.length ? totalExpensesArray.filter((entry) => expensesArrayFilters.includes(entry.category.value)) : totalExpensesArray
  const incomeArrayToMap = incomeArrayFilters.length ? totalIncomeArray.filter((entry) => incomeArrayFilters.includes(entry.category.value)) : totalIncomeArray
  const arrayToRender = currentTab === 'expenses' ? expensesArrayToMap : incomeArrayToMap

  const toggleActive = (id: string) => {
    const arrayToMap: ExpenseType[] | IncomeType[] = currentTab === 'expenses' ? totalExpensesArray : totalIncomeArray
    const updatedArray = arrayToMap.map((entry) => {
      if (entry.id === id) {
        return {
          ...entry,
          active: !entry.active,
        }
      }

      return entry
    }) as ExpenseType[] | IncomeType[]

    if (currentTab === 'expenses') setTotalExpensesArray(updatedArray as ExpenseType[])
    if (currentTab === 'income') setTotalIncomeArray(updatedArray as IncomeType[])

    localStorage.setItem(currentTab === 'expenses' ? 'app_expenses' : 'app_income', JSON.stringify(updatedArray))
  }

  return (
    <Container
      className="pb-36"
      style={{
        minHeight: `calc(100vh - ${controlPanelRef?.current?.clientHeight}px)`,
      }}
    >
      {/* <CategoryFilters currentTab={currentTab} arrayToRender={currentTab === 'expenses' ? totalExpensesArray : totalIncomeArray} /> */}

      <div className="flex flex-col gap-4 pt-4">
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
    </Container>
  )
}
