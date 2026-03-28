import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { Container } from "@mantine/core";
import "@mantine/core/styles.css";
import { Header } from "../widgets/Header/Header";
import { VacancyPage } from "../pages/VacancyPage/VacancyPage";
import { MainPage } from "../pages/MainPage/MainPage";
import classes from "./App.module.css";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container className={classes.container} mt="md">
        <Routes>
          <Route path="/" element={<Navigate to="/vacancies" replace />} />
          <Route path="/vacancies" element={<MainPage />} />
          <Route path="/vacancies/:id" element={<VacancyPage /> } />
        </Routes>
      </Container>
    </>
  );
};

export { App };
