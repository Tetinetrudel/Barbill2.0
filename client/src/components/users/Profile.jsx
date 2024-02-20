import { useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import { updateFailure, updateStart, updateSuccess } from "../../redux/user/userSlice"
import { Modal, Button } from "flowbite-react"
import EditUser from "./EditUser"

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const [formData, setFormData] = useState({
      company: currentUser.company,
      email: currentUser.email,
      profilePicture: currentUser.profilePicture
  })

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        dispatch(updateStart())
        const res = await fetch(`/api/user/update-user`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        const data = await res.json()
  
        if (data.success === false) {
          dispatch(updateFailure(data.message))
          return
        }
        dispatch(updateSuccess(data))
        setOpenModal(false)
      } catch (error) {
        dispatch(updateFailure(error.message))
      }
    } 

  return (
    <div className="flex flex-col gap-6">
        <div className="w-full">
          <h2 className="font-medium text-lg">Profile</h2>
          <div className="rounded-lg shadow-md border border-zinc-200 py-10 px-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-20 h-20 rounded-full">
                <img src={currentUser.profilePicture} alt="photo de profile de l'utilisateur" className="rounded-full w-full h-full"/>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-md text-zinc-800 dark:text-zinc-400">{currentUser.company}</h3>
                <p className="text-sm text-zinc-400">{currentUser.email}</p>
              </div>
            </div>
            <button 
              onClick={() => setOpenModal(true)} 
              className="rounded-full border border-zinc-200 hover:border-zinc-300 text-sm py-2 px-6 text-zinc-500 hover:shadow-lg"
            >Mettre à jour</button>
          </div>
        </div>
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Mettre à jour</Modal.Header>
          <Modal.Body>
            <EditUser handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
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
