import { Listbox, Transition } from '@headlessui/react'

const Select = ({ value, onChange, children }: { value: string; onChange: (value: string) => void; children: React.ReactNode }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      {children}
    </Listbox>
  )
}

const Label = ({ children }: { children: React.ReactNode }) => {
  return (
    <Listbox.Label as="label" className="flex flex-col gap-2">
      <span className="text-sm uppercase">{children}</span>
    </Listbox.Label>
  )
}

Select.Label = Label

const Button = ({ children }: { children: React.ReactNode }) => {
  return <Listbox.Button className="relative w-full py-2 text-left bg-transparent border-b border-gray-500 cursor-pointer">{children}</Listbox.Button>
}

Select.Button = Button

const Options = ({ show, children }: { show: boolean; children: React.ReactNode }) => {
  return (
    <Transition
      show={show}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Listbox.Options className="absolute top-full w-full mt-1 overflow-auto text-base bg-stone-700 shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {children}
      </Listbox.Options>
    </Transition>
  )
}

Select.Options = Options

const Option = ({ value, children }: { value: string; children: React.ReactNode }) => {
  return (
    <Listbox.Option value={value} className="flex justify-between gap-2 cursor-pointer select-none relative py-3 px-2 hover:bg-stone-600">
      {children}
    </Listbox.Option>
  )
}

Select.Option = Option

export default Select
