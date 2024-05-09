import {createSlice} from "@reduxjs/toolkit"

interface initial_State {
    loading: boolean;
    Psychologists: any;
    selectedPsychologist?: any
}

const psychologistSlice = createSlice({
    name:"PsychologistsList",
    initialState: {
        loading:true,
        selectedPsychologist:{},
        Psychologists:[]
    } as initial_State,
    reducers: {
        selectPsychologist: (state, action) => {
            state.selectedPsychologist = action.payload;
          },
        setPsychologist: (state, action) => {
          return {
              loading: false,
              Psychologists: action.payload
          }
    },
},
});

export {psychologistSlice};
export const {setPsychologist,selectPsychologist}=psychologistSlice.actions