import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { psychologistSlice } from "./slice/psychologistSlice";
import Loginslice from "./slice/Loginslice";
import { ForumSlice } from "./slice/ForumSlice";
import {RegistrationSlice} from "./slice/RegistrationSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import storage from "redux-persist/lib/storage";
const persitConfig={
    key:'persist-store',
    storage
}
const rootReducer = combineReducers({
    psychologists:psychologistSlice.reducer,
    login:Loginslice.reducer,
    forum:ForumSlice.reducer,
    registrations: RegistrationSlice.reducer,
})
const persistedReducer = persistReducer(persitConfig,rootReducer)
const store =configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export default store;