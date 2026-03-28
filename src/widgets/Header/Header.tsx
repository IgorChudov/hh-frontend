import { Image, Text, NavLink, Group } from "@mantine/core";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import clsx from "clsx";
import classes from "./Header.module.css";
import hhLogo from "../../shared/assets/hh-logo.svg";
import ProfilePic from "../../shared/assets/profile-icon.svg?react";
import SeparatorPic from "../../shared/assets/separator-icon.svg?react";

export const Header = () => {
  const dispatch = useDispatch()
  return (
    <header className={classes.header}>
      <Group className={classes.logo}>
        <Image className={classes["logo__img"]} src={hhLogo} alt="HH logo" />
        <Text className={classes.text}>.FrontEnd</Text>
      </Group>

      <Group className={classes.nav}>
        <NavLink
          component={Link}
          to="/vacancies"
          label="Вакансии FE"
          className={clsx(classes["nav__link"], classes["nav__link-vacancies"])}
          rightSection={<SeparatorPic />}
          onClick={() => dispatch(setPage(1))}
        />
        <NavLink
          href="#"
          label="Обо мне"
          className={clsx(classes["nav__link"], classes["nav__link-profile"])}
          leftSection={<ProfilePic />}
        />
      </Group>
      <div>{/* Пустой элемент для симметрии grid */}</div>
    </header>
  );
};
