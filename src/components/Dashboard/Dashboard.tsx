'use client'
import { useState } from 'react'
import { Modal } from '../Modal/Modal'
import { ExpensesInput } from '../Modal/ExpensesInput/ExpensesInput'
import { IncomeInput } from '../Modal/IncomeInput/IncomeInput'
import { useModalContext } from '@/context/ModalContext'
import { Listings } from '../Listings/Listings'
import { ControlPanel } from '../ControlPanel/ControlPanel'

export const DashboardEntry = () => {
  const [currentTab, setCurrentTab] = useState<'expenses' | 'income'>('expenses')
  const { setModalOpen } = useModalContext()

  return (
    <main className="tracking-widest">
      <div className="min-h-screen text-white">
        <ControlPanel currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <Listings currentTab={currentTab} />
      </div>

      <Modal>{currentTab === 'expenses' ? <ExpensesInput onClose={() => setModalOpen(false)} /> : <IncomeInput onClose={() => setModalOpen(false)} />}</Modal>
    </main>
  )
}
