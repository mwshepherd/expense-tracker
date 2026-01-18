import { CurrentTimePeriod, ExpenseType, IncomeType } from '@/types/context'
import { calculateEntryTotal } from './calculateEntryTotal'

export const sortObjectArray = (array: ExpenseType[] | IncomeType[], sortOrder: string, currentTimePeriod: CurrentTimePeriod) => {
  const sortedArray = (array as ExpenseType[] | IncomeType[]).sort((a, b) => {
    switch (sortOrder) {
      case 'asc':
        return calculateEntryTotal(a.amount, a.frequency, currentTimePeriod) - calculateEntryTotal(b.amount, b.frequency, currentTimePeriod)
      case 'desc':
        return calculateEntryTotal(b.amount, b.frequency, currentTimePeriod) - calculateEntryTotal(a.amount, a.frequency, currentTimePeriod)
      case 'category':
        return a.category.value.localeCompare(b.category.value)
      case 'active':
        return Number(b.active) - Number(a.active)
      default:
        return 0
    }
  }) as ExpenseType[] | IncomeType[]

  return sortedArray
}
