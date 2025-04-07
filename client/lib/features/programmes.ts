import Toast from "@/ui/Toast";
import { createSlice } from "@reduxjs/toolkit";

type OutputProps = { type: 'success' | 'error', content: string }

type ProgrammesProps = {
  codes: (ProgrammeArgs & {output?: OutputProps})[],
  i: number;
  congrationMessage: boolean,
  edit?: boolean
}

export const programmesSlice = createSlice({
  initialState: { codes: [], i: 0, congrationMessage: false, edit: false } as ProgrammesProps,
  name: 'programmes',
  reducers: {
    setProgrammes: (state, action: {payload: ProgrammeArgs[]}) => {
      state.codes = action.payload
    },
    nextProgramme: (state) => {
      state.i++;
      state.congrationMessage = false;
    },
    setOutput: (state, action: {payload: OutputProps}) => {
      if (!state.codes) return
      state.codes[state.i].output = action.payload

      if (action.payload.type == 'error') return
      if (action.payload.content !== state.codes[state.i].goal + '\n') return Toast('Wrong Output', 'warning')
      state.congrationMessage = true
    },
    setCongrationMsg: (state, action: {payload: boolean}) => {
      state.congrationMessage = action.payload
    },
    setEditingProgramme: (state, action: {payload: boolean}) => {
      state.edit = action.payload
    }
  }
})

export const { setProgrammes, setOutput, setCongrationMsg, nextProgramme, setEditingProgramme } = programmesSlice.actions

export default programmesSlice.reducer