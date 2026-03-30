import { Image, Text, NavLink, Group } from "@mantine/core";
import hhLogo from "../../shared/assets/hh-logo.svg";
import ProfilePic from "../../shared/assets/profile-icon.svg?react";
import SeparatorPic from "../../shared/assets/separator-icon.svg?react";
import { useNavigate, useSearchParams } from "react-router";
import { useAppDispatch } from "../../shared/hooks";
import { resetVacancies } from "../../entities/vacancies/model/vacanciesSlice";
import clsx from "clsx";
import classes from "./Header.module.css";

export const Header = () => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const handleViewMainPage = () => {
    dispatch(resetVacancies());
    setSearchParams({});
    navigate(`/vacancies`);
    window.scrollTo(0, 0);
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
