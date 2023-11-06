export const calculateTotalByTimePeriod = (total: number, timePeriod: string) => {
  switch (timePeriod) {
    case 'weekly':
      return total / 2
    case 'fortnightly':
      return total
    case 'monthly':
      return (total * 26) / 12
    case 'yearly':
      return total * 26
    default:
      return total
  }
}
