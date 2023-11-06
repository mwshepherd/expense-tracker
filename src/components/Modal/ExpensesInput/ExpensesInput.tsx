import Input from '@/components/Input/Input'
import { useAppContext } from '@/context/AppContext'
import { useModalContext } from '@/context/ModalContext'
import { categories } from '@/data/categories'
import { useEffect, useState } from 'react'

export const ExpensesInput = ({ onClose }: { onClose: () => void }) => {
  const defaultFormState = {
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    amount: 0,
    category: 'food',
    active: true,
  }
  const { totalExpensesArray, setTotalExpensesArray } = useAppContext()
  const { editModalId } = useModalContext()
  const [formState, setFormState] = useState(defaultFormState)
  const isEdit = totalExpensesArray.find((expense) => expense.id === formState.id)

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isEdit) {
      const updatedExpensesArray = totalExpensesArray.map((expense) => {
        if (expense.id === formState.id) {
          return formState
        }
        return expense
      })
      setTotalExpensesArray(updatedExpensesArray)
      localStorage.setItem('app_expenses', JSON.stringify(updatedExpensesArray))
      setFormState(defaultFormState)
      onClose()
      return
    }

    setTotalExpensesArray(Array.from(new Set([...totalExpensesArray, formState])))
    localStorage.setItem('app_expenses', JSON.stringify([...totalExpensesArray, formState]))
    setFormState(defaultFormState)
    onClose()
  }

  const handleOnDelete = () => {
    const updatedExpensesArray = totalExpensesArray.filter((expense) => expense.id !== formState.id)
    setTotalExpensesArray(updatedExpensesArray)
    localStorage.setItem('app_expenses', JSON.stringify(updatedExpensesArray))
    setFormState(defaultFormState)
    onClose()
  }

  useEffect(() => {
    if (editModalId) {
      setFormState(totalExpensesArray.find((expense) => expense.id === editModalId)!)
    }
  }, [editModalId, totalExpensesArray])

  return (
    <div className="relative z-10 w-full max-w-md p-6 bg-stone-800 text-white shadow-lg">
      <h2 className="text-2xl font-italic uppercase">{isEdit ? 'Edit' : 'Add'} Expense</h2>
      <form className="flex flex-col gap-4 mt-4" onSubmit={handleOnSubmit}>
        <Input label="Name">
          <Input.Text value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} />
        </Input>
        <Input label="Amount">
          <Input.Number
            value={formState.amount}
            onChange={(e) => setFormState({ ...formState, amount: Number(e.target.value) })}
          />
        </Input>
        <Input label="Category">
          <Input.Select
            value={formState.category}
            onChange={(e) => setFormState({ ...formState, category: e.target.value })}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.name}
              </option>
            ))}
          </Input.Select>
        </Input>

        <div className="flex items-center justify-end gap-2">
          <button type="submit" className="self-end px-4 py-2 text-white bg-green-500 uppercase font-italic">
            {isEdit ? 'Edit' : 'Add'}
          </button>
          {isEdit && (
            <button className="self-end px-4 py-2 text-white bg-red-500 uppercase font-italic" onClick={handleOnDelete}>
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
