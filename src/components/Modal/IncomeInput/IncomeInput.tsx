import { useAppContext } from '@/context/AppContext'
import { useModalContext } from '@/context/ModalContext'
import { useEffect, useState } from 'react'

export const IncomeInput = ({ onClose }: { onClose: () => void }) => {
  const defaultFormState = {
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    amount: 0,
    active: true,
  }
  const { totalIncomeArray, setTotalIncomeArray } = useAppContext()
  const { editModalId } = useModalContext()
  const [formState, setFormState] = useState(defaultFormState)
  const isEdit = totalIncomeArray.find((income) => income.id === formState.id)

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isEdit) {
      const updatedIncomeArray = totalIncomeArray.map((income) => {
        if (income.id === formState.id) {
          return formState
        }
        return income
      })
      setTotalIncomeArray(updatedIncomeArray)
      localStorage.setItem('app_income', JSON.stringify(updatedIncomeArray))
      setFormState(defaultFormState)
      onClose()
      return
    }

    setTotalIncomeArray([...totalIncomeArray, formState])
    localStorage.setItem('app_income', JSON.stringify([...totalIncomeArray, formState]))
    setFormState(defaultFormState)
    onClose()
  }

  useEffect(() => {
    if (editModalId) {
      setFormState(totalIncomeArray.find((income) => income.id === editModalId)!)
    }
  }, [editModalId, totalIncomeArray])

  return (
    <div className="relative z-10 w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Add'} Income</h2>
      <form className="flex flex-col gap-4 mt-4" onSubmit={handleOnSubmit}>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Name</span>
          <input
            className="p-2 border border-gray-300 rounded-lg"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Amount</span>
          <input
            className="p-2 border border-gray-300 rounded-lg"
            type="number"
            value={formState.amount}
            onChange={(e) => setFormState({ ...formState, amount: Number(e.target.value) })}
          />
        </label>
        <div className="flex items-center justify-end gap-2">
          <button className="self-end px-4 py-2 text-white bg-green-500 rounded-lg">{isEdit ? 'Edit' : 'Add'}</button>
          {isEdit && (
            <button
              className="self-end px-4 py-2 text-white bg-red-500 rounded-lg"
              onClick={() => {
                const updatedIncomeArray = totalIncomeArray.filter((income) => income.id !== formState.id)
                setTotalIncomeArray(updatedIncomeArray)
                localStorage.setItem('app_income', JSON.stringify(updatedIncomeArray))
                setFormState(defaultFormState)
                onClose()
              }}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
