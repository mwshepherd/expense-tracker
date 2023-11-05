import { EditIcon } from '@/Icons/EditIcon'
import { RemoveIcon } from '@/Icons/RemoveIcon'
import { ToggleIcon } from '@/Icons/ToggleIcon'
import { useAppContext } from '@/context/AppContext'
import { useModalContext } from '@/context/ModalContext'
import cn from 'classnames'

export const ExpensesListings = () => {
  const { totalExpensesArray, setTotalExpensesArray } = useAppContext()
  const { setModalOpen, setEditModalId } = useModalContext()

  const toggleActive = (id: string) => {
    const updatedArray = totalExpensesArray.map((expense) => {
      if (expense.id === id) {
        return {
          ...expense,
          active: !expense.active,
        }
      }

      return expense
    })

    setTotalExpensesArray(updatedArray)
    localStorage.setItem('app_expenses', JSON.stringify(updatedArray))
  }

  return (
    <div className="flex flex-col gap-4">
      {totalExpensesArray.map((expense) => (
        <div
          key={expense.id}
          className={cn(
            'flex items-center justify-between p-4 bg-gray-800 shadow-lg',
            expense.active ? 'text-white' : 'text-gray-600'
          )}
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">{expense.name}</span>
            <span className="text-sm uppercase">{expense.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">${expense.amount}</span>
            <button onClick={() => toggleActive(expense.id)} className="focus:outline-none w-5 h-5">
              <ToggleIcon className={expense.active ? 'text-green-500' : 'text-gray-400'} />
            </button>
            <button
              className="focus:outline-none w-5 h-5"
              onClick={() => {
                setModalOpen(true)
                setEditModalId(expense.id)
              }}
            >
              <EditIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
