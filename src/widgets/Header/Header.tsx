import { Image, Text, NavLink, Group } from "@mantine/core";
import clsx from "clsx";
import classes from "./Header.module.css";
import hhLogo from "../../shared/assets/hh-logo.svg";
import ProfilePic from "../../shared/assets/profile-icon.svg?react";
import SeparatorPic from "../../shared/assets/separator-icon.svg?react";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();
  const handleViewMainPage = () => {
    navigate(`/vacancies`)
  };

  return (
    <header className={classes.header}>
      <Group className={classes.logo}>
        <Image className={classes["logo__img"]} src={hhLogo} alt="HH logo" />
        <Text className={classes.text}>.FrontEnd</Text>
      </Group>

      <Group className={classes.nav}>
        <NavLink
          onClick={handleViewMainPage}
          label="Вакансии FE"
          className={clsx(classes["nav__link"], classes["nav__link-vacancies"])}
          rightSection={<SeparatorPic />}
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
