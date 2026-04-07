import { Outlet } from "react-router-dom";
import { Container } from "@mantine/core";
import { Header } from "../header/Header";
import classes from "./Layout.module.css";

export const Layout = () => (
  <>
    <Header />
    <Container className={classes.container} mt="md">
      <Outlet />
    </Container>
  </>
);
