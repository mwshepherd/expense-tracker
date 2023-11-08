import { CurrentTimePeriod } from '@/types/context'

export const calculateEntryTotal = (total: number, entryFrequency: CurrentTimePeriod, currentTimePeriod: CurrentTimePeriod) => {
  switch (currentTimePeriod) {
    case 'weekly':
      switch (entryFrequency) {
        case 'weekly':
          return total
        case 'fortnightly':
          return total / 2
        case 'monthly':
          return (total * 12) / 52
        case 'quarterly':
          return (total * 4) / 52
        case 'yearly':
          return total / 52
      }
    case 'fortnightly':
      switch (entryFrequency) {
        case 'weekly':
          return total * 2
        case 'fortnightly':
          return total
        case 'monthly':
          return (total * 12) / 26
        case 'quarterly':
          return (total * 4) / 26
        case 'yearly':
          return total * 26
      }
    case 'monthly':
      switch (entryFrequency) {
        case 'weekly':
          return (total * 52) / 12
        case 'fortnightly':
          return (total * 26) / 12
        case 'monthly':
          return total
        case 'quarterly':
          return (total * 4) / 12
        case 'yearly':
          return total * 12
      }
    case 'quarterly':
      switch (entryFrequency) {
        case 'weekly':
          return (total * 52) / 4
        case 'fortnightly':
          return (total * 26) / 4
        case 'monthly':
          return (total * 12) / 4
        case 'quarterly':
          return total
        case 'yearly':
          return total / 4
      }
    case 'yearly':
      switch (entryFrequency) {
        case 'weekly':
          return total * 52
        case 'fortnightly':
          return total * 26
        case 'monthly':
          return total * 12
        case 'quarterly':
          return total * 4
        case 'yearly':
          return total
      }

    default:
      return total
  }
}
