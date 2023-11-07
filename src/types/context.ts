export type CurrentTimePeriod = 'weekly' | 'fortnightly' | 'monthly' | 'yearly'

export type AppContextType = {
  totalExpensesArray: ExpenseType[]
  totalIncomeArray: IncomeType[]
  expensesArrayFilters: string[]
  incomeArrayFilters: string[]
  currentTimePeriod: CurrentTimePeriod
  controlPanelRef: React.RefObject<HTMLDivElement> | null
  setTotalExpensesArray: React.Dispatch<React.SetStateAction<ExpenseType[]>>
  setTotalIncomeArray: React.Dispatch<React.SetStateAction<IncomeType[]>>
  setExpensesArrayFilters: React.Dispatch<React.SetStateAction<string[]>>
  setIncomeArrayFilters: React.Dispatch<React.SetStateAction<string[]>>
  setCurrentTimePeriod: React.Dispatch<React.SetStateAction<CurrentTimePeriod>>
}

export type ExpenseType = {
  id: string
  name: string
  amount: number
  category: Category
  active: boolean
}

export type IncomeType = {
  id: string
  name: string
  amount: number
  category: Category
  active: boolean
}

export type Category = {
  name: string
  value: string
}
