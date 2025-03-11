import { createSlice } from "@reduxjs/toolkit";

type OutputProps = { type: 'success' | 'error', content: string }

type ProgrammesProps = {
  codes: (ProgrammeArgs & {output?: OutputProps})[],
  i: number;
  afterExecuteSuccessfully?: (output: string) => void
}

export const programmesSlice = createSlice({
  initialState: { codes: [], i: 0 } as ProgrammesProps,
  name: 'programmes',
  reducers: {
    setProgrammes: (state, action: {payload: ProgrammeArgs[]}) => {
      state.codes = action.payload
    },
    afterExecute: (state, action: {payload: (output: string) => void}) => {
      state.afterExecuteSuccessfully = action.payload
    },
    setOutput: (state, action: {payload: OutputProps}) => {
      if (!state.codes) return
      state.codes[state.i].output = action.payload
      if (action.payload.type == 'success' && state.afterExecuteSuccessfully) state.afterExecuteSuccessfully(action.payload.content)
    }
  }
})

export const { setProgrammes, afterExecute, setOutput } = programmesSlice.actions

export default programmesSlice.reducer