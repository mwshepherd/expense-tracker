import { createContext, useContext, useEffect, useState } from 'react'

type ModalContextType = {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  editModalId: string
  setEditModalId: React.Dispatch<React.SetStateAction<string>>
}

const initialState = {
  modalOpen: false,
  setModalOpen: () => {},
  editModalId: '',
  setEditModalId: () => {},
}

export const ModalContext = createContext<ModalContextType>(initialState)
export const useModalContext = () => useContext(ModalContext)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalId, setEditModalId] = useState('')

  useEffect(() => {
    if (!modalOpen) {
      setEditModalId('')
    }
  }, [modalOpen])

  const state = {
    modalOpen,
    setModalOpen,
    editModalId,
    setEditModalId,
  }

  return <ModalContext.Provider value={state}>{children}</ModalContext.Provider>
}
