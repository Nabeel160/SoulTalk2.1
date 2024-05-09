import {createSlice} from "@reduxjs/toolkit"
interface initial_State {
    threads: any;
    selectedThreads?: any
}
const ForumSlice = createSlice({
    name:"Forum",
    initialState: {
        selectedThreads:{},
        threads:[]
    } as initial_State,
    reducers: {
        selectThreads: (state, action) => {
            state.selectedThreads = action.payload;
          },
        setThreads: (state, action) => {
          return {
              ...state,
              threads: action.payload,

          }
    },
},
});

export {ForumSlice};
export const {setThreads,selectThreads}=ForumSlice.actions