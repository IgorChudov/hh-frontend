import { configureStore } from "@reduxjs/toolkit";
import vacanciesReducer from "../entities/vacancies/model/vacanciesSlice";

export const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
