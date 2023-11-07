import { useModalContext } from '@/context/ModalContext'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const { modalOpen, setModalOpen } = useModalContext()

  return (
    <Transition
      show={modalOpen}
      appear={true}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-100 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 w-screen overflow-y-auto flex items-center justify-center">
          <Dialog.Panel className="flex justify-center w-full p-4">{children}</Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  )
}
