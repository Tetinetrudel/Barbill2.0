import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { TextInput, Label, Alert } from 'flowbite-react'

import { getDownloadURL, getStorage, ref, uploadBytesResumable, } from 'firebase/storage'
import { app } from '../../Firebase'

export default function EditUser({ handleSubmit, formData, setFormData }) {
    const { currentUser } = useSelector((state) => state.user)
    const fileRef = useRef(null)
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0)
    const [fileUploadError, setFileUploadError] = useState(false)
   
    useEffect(() => {
        if(file) {
          handleFileUpload(file)
        }
    }, [file])
    
    const handleFileUpload = (file) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)
        const uplaodTask = uploadBytesResumable(storageRef, file)
    
        uplaodTask.on('state_changed',
          (snapshot) => {
            const progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setFilePerc(Math.round(progess))
          },
          (error) => { 
            setFileUploadError(true)
          },
          () => {
            getDownloadURL(uplaodTask.snapshot.ref).then
            ((downloadURL) => {
              setFormData({ ...formData, profilePicture: downloadURL})
            })
          }
        )
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

return (
    <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className={`rounded-full border-2 w-20 h-20 mx-auto ${filePerc === 100 && !fileUploadError ? 'border-green-500' : fileUploadError ? 'border-red-500' : 'border-zinc-200'}`}>
                <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
                <img 
                    onClick={() => fileRef.current.click()}
                    className='w-full h-full object-cover rounded-full cursor-pointer'
                    src={formData.profilePicture || currentUser.profilePicture}
                    alt="logo de l'entreprise" 
                />
            </div>
            {fileUploadError && (
                <Alert className='mt-5' color='failure'>
                    <p>Erreur lors du chargement de l'image. Vérifiez la grosseur de celle-ci avant l'utilisation</p>
                </Alert>
            )}
            <div className='mt-4'>
                <Label value='Compagnie' />
                <TextInput
                    sizing="sm"
                    type='text'
                    id='company'
                    value={formData.company}
                    onChange={handleChange}
                />
            </div>
            <div className='mt-4'>
                <Label value='Courriel' />
                <TextInput
                    sizing="sm"
                    type='email'
                    id='email'
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
        </form>
    </div>
  )
}
