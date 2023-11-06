'use client'
import cn from 'classnames'
import { PlusIcon } from '@/Icons/PlusIcon'
import { useState } from 'react'
import { Modal } from '../Modal/Modal'
import { ExpensesInput } from '../Modal/ExpensesInput/ExpensesInput'
import { IncomeInput } from '../Modal/IncomeInput/IncomeInput'
import { useAppContext } from '@/context/AppContext'
import { useModalContext } from '@/context/ModalContext'
import { Listings } from '../Listings/Listings'
import { Container } from '../Container/Container'
import { CurrentTimePeriod } from '@/types/context'
import { calculateTotalByTimePeriod } from '@/helpers/calculateTotalByTimePeriod'
import { categories } from '@/data/categories'
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

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

export const DashboardEntry = () => {
  const {
    totalExpensesArray,
    expensesArrayFilter,
    totalIncomeArray,
    currentTimePeriod,
    setCurrentTimePeriod,
    setExpensesArrayFilter,
  } = useAppContext()
  const [currentTab, setCurrentTab] = useState<'expenses' | 'income'>('expenses')
  const { modalOpen, setModalOpen } = useModalContext()

  const totalExpenses = calculateTotalByTimePeriod(
    totalExpensesArray.reduce((acc, expense) => (expense.active ? acc + expense.amount : acc), 0),
    currentTimePeriod
  )
  const totalIncome = calculateTotalByTimePeriod(
    totalIncomeArray.reduce((acc, income) => (income.active ? acc + income.amount : acc), 0),
    currentTimePeriod
  )
  const totalRemaining = totalIncome - totalExpenses

  const totalExpensesAsPercentage = (totalExpenses / totalIncome) * 100
  const totalRemainingAsPercentage = (totalRemaining / totalIncome) * 100

  return (
    <main className="tracking-widest">
      <div className="min-h-screen text-white">
        <Container className="flex items-center justify-between pt-4">
          <h2 className="text-[20px] uppercase text-white font-italic font-bold border border-white p-2">Planner</h2>
        </Container>
        <div className="sticky top-0 z-10 bg-black">
          <Container className="flex justify-between pt-4">
            <div>
              <div className="flex flex-col flex-1 text-white font-italic uppercase pb-4">
                <span>Remaining</span>
                <span
                  className={cn('text-[40px] leading-[40px]', totalRemaining >= 0 ? 'text-green-500' : 'text-red-500')}
                >
                  ${totalRemaining.toFixed(2)}
                  <span className="text-xs">{totalRemainingAsPercentage.toFixed(2)}%</span>
                  {/* <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" /> */}
                  {/* <span></span> */}
                </span>
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-italic uppercase">Income</span>
                  <span className="text-green-500">${totalIncome.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-italic uppercase">Expenses</span>
                  <span className="text-red-500">${totalExpenses.toFixed(2)}</span>
                  <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
                  <span className="text-red-500 text-xs">{totalExpensesAsPercentage.toFixed(2)}%</span>
                </div>
              </div>
            </div>
            <button className="flex items-center justify-center w-7 h-7" onClick={() => setModalOpen(true)}>
              <PlusCircleIcon />
            </button>
          </Container>

          <div className="border-b border-b-stone-800">
            <Container className="flex justify-between">
              <div className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setCurrentTab(tab.value as any)}
                    className={cn(
                      'flex gap-2 p-4 justify-between uppercase font-italic',
                      currentTab === tab.value ? 'bg-white text-black' : 'bg-stone-800 text-white'
                    )}
                  >
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
              <label className="bg-black text-white">
                <select
                  className="w-full p-4 bg-black text-white uppercase font-italic focus:outline-none text-right"
                  value={currentTimePeriod}
                  onChange={(e) => setCurrentTimePeriod(e.target.value as CurrentTimePeriod)}
                >
                  <option value="weekly">Weekly</option>
                  <option value="fortnightly">Fortnightly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </label>
            </Container>
          </div>
        </div>

        <Container className="pt-4 pb-8">
          <Listings currentTab={currentTab} />
        </Container>
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
