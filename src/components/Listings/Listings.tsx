import { useAppContext } from '@/context/AppContext'
import { useModalContext } from '@/context/ModalContext'
import { ExpenseType, IncomeType } from '@/types/context'
import { Listing } from './Listing'
import { Container } from '../Container/Container'
import { Loader } from '../Loader/Loader'
import { EmptyState } from './EmptyState'

export const Listings = ({ currentTab }: { currentTab: 'expenses' | 'income' }) => {
  const { setModalOpen, setEditModalId } = useModalContext()
  const { isLoading, totalExpensesArray, expensesArrayFilters, totalIncomeArray, incomeArrayFilters, setTotalExpensesArray, setTotalIncomeArray } = useAppContext()

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

  if (isLoading) return <Loader />
  if (!arrayToRender.length) return <EmptyState currentTab={currentTab} />

  return (
    <Container className="pb-8">
      <div className="flex flex-col gap-4 pt-4 w-full h-full">
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
