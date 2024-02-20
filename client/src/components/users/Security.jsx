import { useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import { Modal, Button } from "flowbite-react"
import EditPassword from "./EditPassword"

export default function Security() {
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)

    const handleSubmit = async (e) => {
      e.preventDefault()          
    } 

  return (
    <div className="flex flex-col gap-6">
        <div className="w-full">
          <h2 className="font-medium text-lg">Sécurité</h2>
          <div className="rounded-lg shadow-md border border-zinc-200 py-10 px-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              mot de passe
            </div>
            <button 
              onClick={() => setOpenModal(true)} 
              className="rounded-full border border-zinc-200 hover:border-zinc-300 text-sm py-2 px-6 text-zinc-500 hover:shadow-lg"
            >Mettre à jour</button>
          </div>
        </div>
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Mettre à jour le mot de passe</Modal.Header>
          <Modal.Body>
            <EditPassword handleSubmit={handleSubmit} />
          </Modal.Body>
          <Modal.Footer>
            <Button color="blue" size="xs" onClick={handleSubmit}>Modifier</Button>
            <Button color="failure" outline size="xs" onClick={() => setOpenModal(false)}>
              Annuler
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}
