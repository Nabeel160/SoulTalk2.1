import {createSlice} from "@reduxjs/toolkit"


const RegistrationSlice = createSlice({
    name:"RegistrationList",
    initialState: {

        Registration:{}
    },
    reducers: {

        setData: (state, action) => {
          return {
              Registration: action.payload,
          }
    },
},
});

export {RegistrationSlice};
export const {setData}=RegistrationSlice.actions