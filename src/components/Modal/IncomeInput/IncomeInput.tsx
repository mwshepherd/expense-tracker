import Input from '@/components/Form/Input/Input'
import { useEffect, useState } from 'react'
import { Button } from '@/components/Form/Button/Button'
import { useAppContext } from '@/context/AppContext'
import { useModalContext } from '@/context/ModalContext'
import { incomeCategories } from '@/data/incomeCategories'
import { CurrentTimePeriod, IncomeType } from '@/types/context'
import { Listbox, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export const IncomeInput = ({ onClose }: { onClose: () => void }) => {
  const defaultFormState: IncomeType = {
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    amount: 0,
    frequency: 'fortnightly',
    category: {
      name: '',
      value: '',
    },
    active: true,
  }
  const { totalIncomeArray, setTotalIncomeArray } = useAppContext()
  const { editModalId } = useModalContext()
  const [formState, setFormState] = useState(defaultFormState)
  const isEdit = totalIncomeArray.find((income) => income.id === formState.id)
  const CurrentIcon = incomeCategories.find((category) => category.value === formState.category?.value)?.icon

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

  const handleOnDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const updatedIncomeArray = totalIncomeArray.filter((income) => income.id !== formState.id)
    setTotalIncomeArray(updatedIncomeArray)
    localStorage.setItem('app_income', JSON.stringify(updatedIncomeArray))
    setFormState(defaultFormState)
    onClose()
  }

  useEffect(() => {
    if (editModalId) {
      setFormState(totalIncomeArray.find((income) => income.id === editModalId)!)
    }
  }, [editModalId, totalIncomeArray])

  return (
    <div className="relative z-10 w-full max-w-md p-4 bg-stone-800 text-white shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-italic uppercase">{isEdit ? 'Edit' : 'Add'} Income</h2>
        <button onClick={onClose} className="text-white hover:text-gray-500 w-5 h-5">
          <XMarkIcon />
        </button>
      </div>
      <form className="flex flex-col gap-4 mt-4" onSubmit={handleOnSubmit}>
        <Input label="Name">
          <Input.Text value={formState.name} placeholder="e.g. Salary" onChange={(e) => setFormState({ ...formState, name: e.target.value })} />
        </Input>
        <div className="flex justify-between gap-4">
          <Input label="Amount">
            <Input.Number value={formState.amount} onChange={(e) => setFormState({ ...formState, amount: Number(e.target.value) })} />
          </Input>
          <Input label="Frequency">
            <Input.Select value={formState.frequency} onChange={(e) => setFormState({ ...formState, frequency: e.target.value as CurrentTimePeriod })}>
              <option value="weekly">Weekly</option>
              <option value="fortnightly">Fortnightly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </Input.Select>
          </Input>
        </div>
        <Listbox
          value={formState.category.value}
          onChange={(category) => {
            const selectedCategory = incomeCategories.find((cat) => cat.value === category)!

            setFormState({
              ...formState,
              category: {
                name: selectedCategory.name,
                value: selectedCategory.value,
              },
            })
          }}
        >
          {({ open }) => (
            <>
              <Listbox.Label as="label" className="flex flex-col gap-2">
                <span className="text-sm uppercase">Category</span>
              </Listbox.Label>
              <div className="relative">
                <Listbox.Button className="relative w-full py-2 text-left bg-transparent border-b border-gray-500 cursor-pointer">
                  <div className="flex items-center gap-2">
                    {CurrentIcon && <CurrentIcon className="w-5 h-5 text-white" aria-hidden="true" />}
                    <span className="block truncate font-italic uppercase">{formState.category?.name || 'Select Category'}</span>
                  </div>
                  <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        // eslint-disable-next-line max-len
                        d="M10.7071 13.7071C10.3166 14.0976 9.68342 14.0976 9.29289 13.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L10 11.5858L13.2929 8.29289C13.6834 7.90237 14.3166 7.90237 14.7071 8.29289C15.0976 8.68342 15.0976 9.31658 14.7071 9.70711L10.7071 13.7071Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Listbox.Options className="absolute top-full w-full mt-1 overflow-auto text-base bg-stone-700 shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {incomeCategories.map((category) => (
                      <Listbox.Option
                        key={category.value}
                        value={category.value}
                        className="flex justify-between gap-2 cursor-pointer select-none relative py-3 px-2 hover:bg-stone-600"
                      >
                        {({ selected, active }) => {
                          return (
                            <>
                              <div className="flex gap-2">
                                {category.icon && <category.icon className="w-5 h-5 text-white" aria-hidden="true" />}
                                <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate uppercase font-italic`}>{category.name}</span>
                              </div>
                              {selected && (
                                <span className={`${active ? 'text-amber-600' : 'text-amber-600'} flex items-center pl-3`}>
                                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      // eslint-disable-next-line max-len
                                      d="M10.7071 13.7071C10.3166 14.0976 9.68342 14.0976 9.29289 13.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L10 11.5858L13.2929 8.29289C13.6834 7.90237 14.3166 7.90237 14.7071 8.29289C15.0976 8.68342 15.0976 9.31658 14.7071 9.70711L10.7071 13.7071Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )
                        }}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
        <div className="flex items-center justify-end gap-2">
          <Button type="submit" style="success">
            {isEdit ? 'Edit' : 'Add'}
          </Button>
          {isEdit && (
            <Button style="danger" onClick={handleOnDelete}>
              Delete
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
