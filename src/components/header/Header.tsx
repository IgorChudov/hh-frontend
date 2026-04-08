import { useCallback } from "react";
import { Image, Text, NavLink, Group } from "@mantine/core";
import hhLogo from "../../assets/hh-logo.svg";
import ProfilePic from "../../assets/profile-icon.svg?react";
import { useNavigate, useSearchParams, useMatch } from "react-router";
import { useAppDispatch } from "../../store/hooks";
import { resetVacancies, loadVacancies } from "../../store/vacanciesSlice";
import clsx from "clsx";
import classes from "./Header.module.css";

export const Header = () => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const isVacanciesActive = useMatch("/vacancies/*");
  const isAboutActive = useMatch("/about");

  const handleViewMainPage = useCallback(() => {
    dispatch(resetVacancies());
    setSearchParams({});
    navigate(`/vacancies`);
    window.scrollTo(0, 0);
    dispatch(loadVacancies());
  }, [dispatch, navigate, setSearchParams]);

  const handleViewAboutPage = useCallback(() => {
    navigate(`/about`);
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <header className={classes.header}>
      <Group className={classes.logo}>
        <Image className={classes["logo__img"]} src={hhLogo} alt="HH logo" />
        <Text className={classes.text}>.FrontEnd</Text>
      </Group>

      <div className={classes.nav}>
        <NavLink
          onClick={handleViewMainPage}
          label="Вакансии FE"
          className={clsx(classes["nav__link"], {
            [classes["nav__link--active"]]: isVacanciesActive,
          })}
        />
        <NavLink
          onClick={handleViewAboutPage}
          label="Обо мне"
          className={clsx(classes["nav__link"], classes["nav__link-profile"], {
            [classes["nav__link--active"]]: isAboutActive,
          })}
          leftSection={<ProfilePic />}
        />
      </div>
      <div>{/* Пустой элемент для симметрии grid */}</div>
    </header>
  );
};
