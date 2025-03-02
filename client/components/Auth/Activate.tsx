import Button from '@/ui/Button'
import Input from '@/ui/Input'
import React from 'react'

const Activate = () => {
  return (
    <form>
      <Input label='Code' type="number" placeholder="Enter the code we sent you" name='fullname' required />
      <Button fullWidth>Submit</Button>
    </form>
  )
}

export default Activate