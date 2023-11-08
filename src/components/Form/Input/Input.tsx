const Input = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <label className="flex flex-1 flex-col gap-2">
      <span className="text-sm uppercase">{label}</span>
      {children}
    </label>
  )
}

const Text = ({ value, placeholder, onChange }: { value: string; placeholder?: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <input
      className="py-2 border-b border-gray-500 bg-transparent focus:outline-none focus:border-gray-300 font-italic uppercase"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

Input.Text = Text

const Number = ({ value, onChange }: { value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return <input className="py-2 border-b border-gray-500 bg-transparent focus:outline-none focus:border-gray-300" type="number" value={value} onChange={onChange} />
}

Input.Number = Number

const Select = ({ value, onChange, children }: { value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }) => {
  return (
    <select className="py-2 border-b border-gray-500 bg-transparent focus:outline-none focus:border-gray-300 font-italic uppercase" value={value} onChange={onChange}>
      {children}
    </select>
  )
}

Input.Select = Select

export default Input
