import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { VacanciesPage } from "./pages/vacancies_page/VacanciesPage";
import { VacanciesList } from "./components/vacancies_list/VacanciesList";
import { VacancyPage } from "./pages/vacancy_page/VacancyPage";
import { AboutPage } from "./pages/about_page/AboutPage";
import { NotFoundPage } from "./pages/notfound_page/NotFoundPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/vacancies" replace />} />
        <Route path="vacancies" element={<VacanciesPage />}>
          <Route index element={<VacanciesList />} />
          <Route path="moscow" element={<VacanciesList />} />
          <Route path="petersburg" element={<VacanciesList />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="vacancies/:id" element={<VacancyPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  ),
  { basename: "/hh-frontend" }
);
