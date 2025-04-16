import { createReview } from "@/actions/reviews.actions";
import { setSubmit } from "@/lib/features/programmes"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import Button from "@/ui/Button"
import Input from "@/ui/Input";
import Toast from "@/ui/Toast";
import { createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ThemeProvider } from "@mui/material"
import { useParams } from "next/navigation";
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const SubmitCode = () => {
  const [flds, setFlds] = useState({subject: '', explication: ''})
  const { submit, code, userId } = useAppSelector(state =>
      ({
        submit: state.programmes.submit,
        code: state.programmes.codes[state.programmes.i].code,
        userId: state.user?.id!
      }))
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(setSubmit(false))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlds({...flds, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!flds.subject || !flds.explication) {
      Toast('Please fill all fields', 'error')
      return
    }

    const res = await createReview({...flds, code, programmeId: id as string}, userId)
    if (res.message !== 'SUCCESS') {
      Toast('Error submitting code', 'error')
      return
    }

    dispatch(setSubmit(false))
    Toast('Code submitted successfully. You will be notified when a reviewer is assigned to you', 'success')
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog
        open={submit || false}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleSubmit,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Submit your code for review"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please fill the following fields to submit your code for review
          </DialogContentText>
          <div style={{minWidth: '500px'}}>
            <Input label='subject' name='subject' value={flds.subject} onChange={handleChange} autoFocus required />
          </div>

          <div style={{minWidth: '500px'}}>
            <Input label='explication' name='explication' value={flds.explication} onChange={handleChange} required multiline />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} type="button">Cancel</Button>
          <Button type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

export default SubmitCode