import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { questionnairesSlice } from "./questionnaires/questionnairesSlice";
import { questionsSlice } from "./questions/questionsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
        reducer: combineReducers({
                questionnaires: questionnairesSlice.reducer,
                questions: questionsSlice.reducer,
            }
        )
    })
;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector