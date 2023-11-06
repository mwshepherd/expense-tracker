export type CurrentTimePeriod = 'weekly' | 'fortnightly' | 'monthly' | 'yearly'

export type AppContextType = {
  totalExpensesArray: ExpenseType[]
  expensesArrayFilter: string
  totalIncomeArray: IncomeType[]
  currentTimePeriod: CurrentTimePeriod
  setTotalExpensesArray: React.Dispatch<React.SetStateAction<ExpenseType[]>>
  setExpensesArrayFilter: React.Dispatch<React.SetStateAction<string>>
  setTotalIncomeArray: React.Dispatch<React.SetStateAction<IncomeType[]>>
  setCurrentTimePeriod: React.Dispatch<React.SetStateAction<CurrentTimePeriod>>
}

export type ExpenseType = {
  id: string
  name: string
  amount: number
  category: string
  active: boolean
}

export type IncomeType = {
  id: string
  name: string
  amount: number
  category: string
  active: boolean
}
