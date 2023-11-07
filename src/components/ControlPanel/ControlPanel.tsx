import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Container } from '../Container/Container'
import { useAppContext } from '@/context/AppContext'
import { useModalContext } from '@/context/ModalContext'
import { Summary } from './Summary/Summary'
import { Tabs } from './Tabs/Tabs'
import { PeriodFilter } from './PeriodFilter/PeriodFilter'
import { ListingsHeader } from '../Listings/ListingsHeader'
import { CategoryFilters } from '../Filters/CategoryFilters'

export const ControlPanel = ({ currentTab, setCurrentTab }: { currentTab: 'expenses' | 'income'; setCurrentTab: (tab: 'expenses' | 'income') => void }) => {
  const { totalExpensesArray, totalIncomeArray, controlPanelRef, currentTimePeriod, setCurrentTimePeriod } = useAppContext()
  const { setModalOpen } = useModalContext()

  return (
    <div className="sticky top-0 z-10 bg-black" ref={controlPanelRef}>
      <Container className="flex justify-between pt-4">
        <Summary />
        <div className="flex items-start">
          <div className="flex flex-col-reverse md:flex-row items-end md:items-center gap-2">
            <button className="w-7 h-7 text-white" onClick={() => setModalOpen(true)}>
              <PlusCircleIcon />
            </button>
            <h2 className="-mt-1 md:mt-0 text-xs uppercase text-white font-italic border border-white p-1">Tracker</h2>
          </div>
        </div>
      </Container>

      <div className="border-b border-b-stone-800">
        <Container className="flex justify-between items-end">
          <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <PeriodFilter currentTimePeriod={currentTimePeriod} setCurrentTimePeriod={setCurrentTimePeriod} />
        </Container>
      </div>
      <Container>
        <CategoryFilters currentTab={currentTab} arrayToRender={currentTab === 'expenses' ? totalExpensesArray : totalIncomeArray} />
      </Container>
      <ListingsHeader />
    </div>
  )
}
