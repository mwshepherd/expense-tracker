'use client'
import { DashboardEntry } from '@/components/Dashboard/Dashboard'
import { AppProvider } from '@/context/AppContext'
import { ModalProvider } from '@/context/ModalContext'

const Dashboard = () => {
  return (
    <AppProvider>
      <ModalProvider>
        <DashboardEntry />
      </ModalProvider>
    </AppProvider>
  )
}

export default Dashboard
