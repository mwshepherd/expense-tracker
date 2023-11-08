import { useModalContext } from '@/context/ModalContext'
import { Button } from '../Form/Button/Button'

export const EmptyState = ({ currentTab }: { currentTab: 'expenses' | 'income' }) => {
  const { setModalOpen } = useModalContext()

  return (
    <div className="h-[calc(100vh_-_254px)] flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500 uppercase font-italic">No {currentTab === 'expenses' ? 'expenses' : 'income'} to show</p>
      <Button onClick={() => setModalOpen(true)}>Add {currentTab === 'expenses' ? 'Expense' : 'Income'}</Button>
    </div>
  )
}
