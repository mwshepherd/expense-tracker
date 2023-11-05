export const Modal = ({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center text-black">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      {children}
    </div>
  )
}
