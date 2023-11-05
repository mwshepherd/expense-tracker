'use client'
import cn from 'classnames'
import { PlusIcon } from '@/Icons/PlusIcon'
import { useState } from 'react'
import { Modal } from '../Modal/Modal'
import { ExpensesInput } from '../Modal/ExpensesInput/ExpensesInput'
import { IncomeInput } from '../Modal/IncomeInput/IncomeInput'
import { useAppContext } from '@/context/AppContext'
import { ExpensesListings } from '../Listings/ExpensesListings'
import { IncomeListings } from '../Listings/IncomeListings'
import { useModalContext } from '@/context/ModalContext'

const tabs = [
  {
    name: 'Expenses',
    value: 'expenses',
  },
  {
    name: 'Income',
    value: 'income',
  },
]

const calculateTotalByTimePeriod = (total: number, timePeriod: string) => {
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

export const DashboardEntry = () => {
  const { totalExpensesArray, totalIncomeArray } = useAppContext()
  const [currentTab, setCurrentTab] = useState<'expenses' | 'income'>('expenses')
  const { modalOpen, setModalOpen } = useModalContext()
  const [currentTimePeriod, setCurrentTimePeriod] = useState('fortnightly')
  const totalExpenses = calculateTotalByTimePeriod(
    totalExpensesArray.reduce((acc, expense) => (expense.active ? acc + expense.amount : acc), 0),
    currentTimePeriod
  )
  const totalIncome = calculateTotalByTimePeriod(
    // Find the total income by adding up all the income amounts if the income is active
    totalIncomeArray.reduce((acc, income) => (income.active ? acc + income.amount : acc), 0),
    currentTimePeriod
  )
  const totalRemaining = totalIncome - totalExpenses

  return (
    <main>
      <div className="min-h-screen px-4 md:px-8 md:pb-8 text-white">
        <div className="sticky top-0 z-10 bg-black pb-4">
          <div className="flex items-center justify-between mb-4 gap-4">
            <h2 className="text-[50px] uppercase text-white font-bold">Planner</h2>
            <button className="flex items-center justify-center w-12 h-12 bg-white" onClick={() => setModalOpen(true)}>
              <PlusIcon />
            </button>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <label className="flex-1 p-4 bg-black text-white">
                <select
                  className="flex-1 w-full p-4 bg-black text-white"
                  value={currentTimePeriod}
                  onChange={(e) => setCurrentTimePeriod(e.target.value)}
                >
                  <option value="weekly">Weekly</option>
                  <option value="fortnightly">Fortnightly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </label>
              <div className="flex flex-1 gap-2 p-4 justify-between text-white md:text-[40px] font-bold uppercase">
                <span>Remaining</span>
                <span className="text-green-500">${totalRemaining.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setCurrentTab(tab.value as any)}
                  className={cn(
                    'flex flex-1 gap-2 p-4 justify-between md:text-[40px] font-bold uppercase',
                    currentTab === tab.value ? 'bg-white text-black' : 'bg-gray-800 text-white'
                  )}
                >
                  <span>{tab.name}</span>
                  <span className={cn(tab.value === 'expenses' ? 'text-red-500' : 'text-green-500')}>
                    {tab.value === 'expenses' ? `$${totalExpenses.toFixed(2)}` : `$${totalIncome.toFixed(2)}`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8">{currentTab === 'expenses' ? <ExpensesListings /> : <IncomeListings />}</div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {currentTab === 'expenses' ? (
          <ExpensesInput onClose={() => setModalOpen(false)} />
        ) : (
          <IncomeInput onClose={() => setModalOpen(false)} />
        )}
      </Modal>
    </main>
  )
}
