import { EditIcon } from '@/Icons/EditIcon'
import { ToggleIcon } from '@/Icons/ToggleIcon'
import { useAppContext } from '@/context/AppContext'
import { useModalContext } from '@/context/ModalContext'

export const IncomeListings = () => {
  const { totalIncomeArray, setTotalIncomeArray } = useAppContext()
  const { setModalOpen, setEditModalId } = useModalContext()

  const toggleActive = (id: string) => {
    const updatedArray = totalIncomeArray.map((income) => {
      if (income.id === id) {
        return {
          ...income,
          active: !income.active,
        }
      }

      return income
    })

    setTotalIncomeArray(updatedArray)
    localStorage.setItem('app_income', JSON.stringify(updatedArray))
  }

  return (
    <div className="flex flex-col gap-4">
      {totalIncomeArray.map((income, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-gray-800 shadow-lg text-white">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">{income.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">${income.amount}</span>
            <button onClick={() => toggleActive(income.id)} className="focus:outline-none w-5 h-5">
              <ToggleIcon className={income.active ? 'text-green-500' : 'text-gray-400'} />
            </button>
            <button
              className="focus:outline-none w-5 h-5"
              onClick={() => {
                setModalOpen(true)
                setEditModalId(income.id)
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
