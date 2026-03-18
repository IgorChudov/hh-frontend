import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchVacancies } from "../api/vacanciesApi";
import type { Vacancy } from "./types";

export interface VacanciesState {
  items: Vacancy[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  skills: string[];
  search: string;
  city: string;
}

const initialState: VacanciesState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  skills: ["TypeScript", "React", "Redux"],
  search: "",
  city: "",
};

export const loadVacancies = createAsyncThunk(
  "vacancies/loadVacancies",
  async (_, { getState }) => {
    const state = getState() as { vacancies: VacanciesState };
    const { page, skills, search, city } = state.vacancies;
    const data = await fetchVacancies({ page, skills, search, city });
    return data;
  }
);

const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadVacancies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadVacancies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalPages = Math.ceil(action.payload.found / 10);
      })
      .addCase(loadVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки";
      });
  },
});

export const { setPage, setSearch, setCity, setSkills } =
  vacanciesSlice.actions;
export default vacanciesSlice.reducer;
