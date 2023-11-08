import { memo } from 'react'
import { CurrentTimePeriod } from '@/types/context'
import { Listbox, Transition } from '@headlessui/react'
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const options = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Fortnightly', value: 'fortnightly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Yearly', value: 'yearly' },
]

const PeriodFilter = ({ currentTimePeriod, setCurrentTimePeriod }: { currentTimePeriod: CurrentTimePeriod; setCurrentTimePeriod: (timePeriod: CurrentTimePeriod) => void }) => {
  return (
    <Listbox value={currentTimePeriod} onChange={setCurrentTimePeriod}>
      {({ open }) => (
        <div className="relative md:w-[180px]">
          <Listbox.Button className="flex justify-end items-center gap-2 py-2 md:p-2 w-full">
            <CalendarIcon className="w-3 h-3 md:w-5 md:h-5" />
            <span className="uppercase font-italic text-xs md:text-base">{currentTimePeriod}</span>
            {open ? <ChevronUpIcon className="w-3 h-3 md:w-5 md:h-5" /> : <ChevronDownIcon className="w-3 h-3 md:w-5 md:h-5" />}
          </Listbox.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options className="absolute right-0 w-content bg-stone-700">
              {options.map((option) => (
                <Listbox.Option key={option.value} value={option.value} className="cursor-pointer font-italic uppercase text-right hover:bg-stone-800 p-2 text-xs md:text-base">
                  {option.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}

export default memo(PeriodFilter)
