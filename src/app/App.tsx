import React from "react";
import { Routes, Route } from "react-router";
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
          <Route path="/" element={<MainPage />} />
          <Route path="/vacancy/:id" element={<VacancyPage /> } />
        </Routes>
      </Container>
    </>
  );
};

export { App };
