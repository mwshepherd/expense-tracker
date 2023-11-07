'use client'
import { useState } from 'react'
import { Modal } from '../Modal/Modal'
import { ExpensesInput } from '../Modal/ExpensesInput/ExpensesInput'
import { IncomeInput } from '../Modal/IncomeInput/IncomeInput'
import { useModalContext } from '@/context/ModalContext'
import { Listings } from '../Listings/Listings'
import { Container } from '../Container/Container'
import { ControlPanel } from '../ControlPanel/ControlPanel'

export const DashboardEntry = () => {
  const [currentTab, setCurrentTab] = useState<'expenses' | 'income'>('expenses')
  const { setModalOpen } = useModalContext()

  return (
    <main className="tracking-widest overflow-y-scroll h-screen">
      <div className="min-h-screen text-white">
        {/* <Container className="flex items-center justify-between pt-4">
          <h2 className="text-[20px] uppercase text-white font-italic font-bold border border-white p-2">Planner</h2>
        </Container> */}
        <ControlPanel currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <Listings currentTab={currentTab} />
      </div>

      <Modal>{currentTab === 'expenses' ? <ExpensesInput onClose={() => setModalOpen(false)} /> : <IncomeInput onClose={() => setModalOpen(false)} />}</Modal>
    </main>
  )
}
