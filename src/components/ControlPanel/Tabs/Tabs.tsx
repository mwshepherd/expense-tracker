import cn from 'classnames'

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

export const Tabs = ({ currentTab, setCurrentTab }: { currentTab: 'expenses' | 'income'; setCurrentTab: (tab: 'expenses' | 'income') => void }) => {
  return (
    <div className="flex">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setCurrentTab(tab.value as any)}
          className={cn('flex gap-2 p-2 md:px-4 justify-between uppercase font-italic', currentTab === tab.value ? 'bg-white text-black' : 'bg-stone-800 text-white')}
        >
          <span className="text-xs md:text-base">{tab.name}</span>
        </button>
      ))}
    </div>
  )
}
