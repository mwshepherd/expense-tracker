import { AppContextType, CurrentTimePeriod, ExpenseType, IncomeType } from '@/types/context'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

const initialState: AppContextType = {
  totalExpensesArray: [],
  totalIncomeArray: [],
  expensesArrayFilters: [],
  incomeArrayFilters: [],
  currentTimePeriod: 'fortnightly',
  currentSortOrder: 'default',
  isLoading: true,
  setTotalExpensesArray: () => {},
  setTotalIncomeArray: () => {},
  setExpensesArrayFilters: () => {},
  setIncomeArrayFilters: () => {},
  setCurrentTimePeriod: () => {},
  setCurrentSortOrder: () => {},
  setIsLoading: () => {},
}

export const AppContext = createContext<AppContextType>(initialState)
export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalExpensesArray, setTotalExpensesArray] = useState<ExpenseType[]>([])
  const [expensesArrayFilters, setExpensesArrayFilters] = useState<string[]>([])
  const [totalIncomeArray, setTotalIncomeArray] = useState<IncomeType[]>([])
  const [incomeArrayFilters, setIncomeArrayFilters] = useState<string[]>([])
  const [currentTimePeriod, setCurrentTimePeriod] = useState<CurrentTimePeriod>('fortnightly')
  const [currentSortOrder, setCurrentSortOrder] = useState<string>('default')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const expenses = localStorage.getItem('app_expenses')
    const income = localStorage.getItem('app_income')

    if (expenses) setTotalExpensesArray(JSON.parse(expenses))
    if (income) setTotalIncomeArray(JSON.parse(income))

    setIsLoading(false)
  }, [])

  const state = {
    totalExpensesArray,
    totalIncomeArray,
    expensesArrayFilters,
    incomeArrayFilters,
    currentTimePeriod,
    currentSortOrder,
    isLoading,
    setTotalExpensesArray,
    setTotalIncomeArray,
    setExpensesArrayFilters,
    setIncomeArrayFilters,
    setCurrentTimePeriod,
    setCurrentSortOrder,
    setIsLoading,
  }

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}
