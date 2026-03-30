import { Text } from "@mantine/core";
import { useLocation } from "react-router";
import { VacancyCard } from "../../widgets/VacancyCard/VacancyCard";
import type { Vacancy } from "../../entities/vacancies/model/types";
import classes from "./VacancyPage.module.css"

export const VacancyPage = () => {
  const { state } = useLocation();
  const vacancy = state?.vacancy as Vacancy;

  if (!vacancy) {
    return <div className={classes.container}>Вакансия не найдена</div>
  }

  return (
    <div className={classes.container}>
      <VacancyCard vacancy={vacancy} variant="detail"/>

      <div className={classes.card}>
        <Text className={classes.title}>Требования</Text>
        <Text className={classes.text}>{vacancy.snippet.requirement}</Text>
        <Text className={classes["sub-title"]}>Обязанности</Text>
        <Text>{vacancy.snippet.responsibility}</Text>
      </div>
    </div>
  )
}