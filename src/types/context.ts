export type CurrentTimePeriod = 'weekly' | 'fortnightly' | 'monthly' | 'quarterly' | 'yearly'

export type AppContextType = {
  totalExpensesArray: ExpenseType[]
  totalIncomeArray: IncomeType[]
  expensesArrayFilters: string[]
  incomeArrayFilters: string[]
  currentTimePeriod: CurrentTimePeriod
  currentSortOrder: string
  isLoading: boolean
  setTotalExpensesArray: React.Dispatch<React.SetStateAction<ExpenseType[]>>
  setTotalIncomeArray: React.Dispatch<React.SetStateAction<IncomeType[]>>
  setExpensesArrayFilters: React.Dispatch<React.SetStateAction<string[]>>
  setIncomeArrayFilters: React.Dispatch<React.SetStateAction<string[]>>
  setCurrentTimePeriod: React.Dispatch<React.SetStateAction<CurrentTimePeriod>>
  setCurrentSortOrder: React.Dispatch<React.SetStateAction<string>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export type ExpenseType = {
  id: string
  name: string
  amount: number
  frequency: CurrentTimePeriod
  category: Category
  active: boolean
}

export type IncomeType = {
  id: string
  name: string
  amount: number
  frequency: CurrentTimePeriod
  category: Category
  active: boolean
}

export type Category = {
  name: string
  value: string
}
