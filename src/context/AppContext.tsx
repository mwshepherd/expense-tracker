import { createContext, useContext, useEffect, useState } from 'react'

type ExpenseType = {
  id: string
  name: string
  amount: number
  category: string
  active: boolean
}

type IncomeType = {
  id: string
  name: string
  amount: number
  active: boolean
}

type AppContextType = {
  totalExpensesArray: ExpenseType[]
  totalIncomeArray: IncomeType[]
  setTotalExpensesArray: React.Dispatch<React.SetStateAction<ExpenseType[]>>
  setTotalIncomeArray: React.Dispatch<React.SetStateAction<IncomeType[]>>
}

const initialState = {
  totalExpensesArray: [],
  totalIncomeArray: [],
  setTotalExpensesArray: () => {},
  setTotalIncomeArray: () => {},
}

export const AppContext = createContext<AppContextType>(initialState)
export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalExpensesArray, setTotalExpensesArray] = useState<ExpenseType[]>([])
  const [totalIncomeArray, setTotalIncomeArray] = useState<IncomeType[]>([])

  useEffect(() => {
    const expenses = localStorage.getItem('app_expenses')
    const income = localStorage.getItem('app_income')

    if (expenses) {
      setTotalExpensesArray(JSON.parse(expenses))
    }

    if (income) {
      setTotalIncomeArray(JSON.parse(income))
    }
  }, [])

  const state = {
    totalExpensesArray,
    totalIncomeArray,
    setTotalExpensesArray,
    setTotalIncomeArray,
  }

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}
