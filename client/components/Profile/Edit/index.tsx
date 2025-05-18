'use client'
import Image from 'next/image'
import './style.css'
import ImageUpload from '@/ui/ImageUpload'
import { FormEvent, useState } from 'react'
import Input from '@/ui/Input'
import Button from '@/ui/Button'
import { editProfile } from '@/actions/user.action'
import { useAppDispatch } from '@/lib/hooks'
import { setUser } from '@/lib/features/user'
import { setUserCookie } from '@/actions/auth.actions'

type EditProfileProps = {
  user: UserProps
}

const EditProfiel = ({user}:EditProfileProps) => {
  const [icon, setIcon] = useState(user.icon)
  const [fullname, setFullname] = useState(user.fullname)
  const [loading, setLoading] = useState<'main-data' | 'password'>()
  const dispatch = useAppDispatch()

  const changeIcon = (path: string, id: string) => {
    setIcon({path, id})
  }

  const submitData =  async (e: FormEvent) => {
    e.preventDefault()
    setLoading('main-data')
    await editProfile(user.id!, {fullname, icon})

    const newData = {...user, fullname, icon}
    dispatch(setUser(newData))
    await setUserCookie(newData)

    setLoading(undefined)
  }

  return (
    <form className='edit-form' onSubmit={submitData}>
      <div className="p-icon">
        <ImageUpload lable='upload an icon' changeFile={changeIcon} />
        <Image src={icon.path} alt='icon' width={50} height={50} />
      </div>

      <Input label='Fullname' value={fullname} onChange={(e: any) => setFullname(e.target.value)} onFocus={(e: any) => e.target.select()} />

      <Button loading={loading == 'main-data'} fullWidth>Save</Button>
    </form>
  )
}

export default EditProfiel
