import React from "react";
import { Container } from "@mantine/core";
import "@mantine/core/styles.css";
import { Header } from "../widgets/Header/Header";
import { MainPage } from "../pages/MainPage/MainPage";
import classes from "./App.module.css";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container className={classes.container} mt="md">
        <MainPage />
      </Container>
    </>
  );
};

export { App };
