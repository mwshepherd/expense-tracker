import { AppContextType, CurrentTimePeriod, ExpenseType, IncomeType } from '@/types/context'
import { createContext, useContext, useEffect, useState } from 'react'

const initialState: AppContextType = {
  totalExpensesArray: [],
  expensesArrayFilter: '',
  totalIncomeArray: [],
  currentTimePeriod: 'fortnightly',
  setTotalExpensesArray: () => {},
  setExpensesArrayFilter: () => {},
  setTotalIncomeArray: () => {},
  setCurrentTimePeriod: () => {},
}

export const AppContext = createContext<AppContextType>(initialState)
export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalExpensesArray, setTotalExpensesArray] = useState<ExpenseType[]>([])
  const [expensesArrayFilter, setExpensesArrayFilter] = useState<string>('')
  const [totalIncomeArray, setTotalIncomeArray] = useState<IncomeType[]>([])
  const [currentTimePeriod, setCurrentTimePeriod] = useState<CurrentTimePeriod>('fortnightly')

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
    expensesArrayFilter,
    totalIncomeArray,
    currentTimePeriod,
    setTotalExpensesArray,
    setExpensesArrayFilter,
    setTotalIncomeArray,
    setCurrentTimePeriod,
  }

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}
