import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Text, Group, Badge } from "@mantine/core";
import type { Vacancy } from "../../api/types";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  formatSalary,
  formatExperience,
  getWorkFormat,
} from "../../utils/vacancyUtils";
import { loadVacancies } from "../../store/vacanciesSlice";
import { VacancyPageSkeleton } from "./VacancyPageSkeleton";
import classes from "./VacancyPage.module.css";
import clsx from "clsx";

export const VacancyPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const vacanciesFromStore = useAppSelector((state) => state.vacancies.items);
  const loadingFromStore = useAppSelector((state) => state.vacancies.loading);
  const errorFromStore = useAppSelector((state) => state.vacancies.error);

  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [localLoading, setLocalLoading] = useState(false);

  // Ищем вакансию в store
  useEffect(() => {
    if (!id) return;

    const found = vacanciesFromStore.find((v) => v.id === id);
    if (found) {
      setVacancy(found);
      setLocalLoading(false);
    }
  }, [id, vacanciesFromStore]);

  // Если не нашли в store — загружаем
  useEffect(() => {
    if (!id || vacancy || localLoading) return;

    setLocalLoading(true);
    dispatch(loadVacancies()).finally(() => {
      setLocalLoading(false);
    });
  }, [id, vacancy, localLoading, dispatch]);

  const isLoading = localLoading || loadingFromStore;

  if (!id || localLoading) {
    return <VacancyPageSkeleton />;
  }

  if (errorFromStore || (!vacancy && !isLoading)) {
    navigate("/vacancies", { replace: true });
    return null;
  }

  if (!vacancy) {
    return null;
  }

  const { label, bg, color } = getWorkFormat(vacancy);

  return (
    <Group className={classes.page}>
      <div className={classes.card}>
        <Text className={classes.title}>{vacancy.name}</Text>
        <Group className={classes.wrapper}>
          <Text className={classes.salary}>{formatSalary(vacancy)}</Text>
          <Text className={classes.experience}>
            {formatExperience(vacancy.experience?.name)}
          </Text>
        </Group>

        <Text className={classes.company}>{vacancy.employer.name}</Text>
        <Badge
          className={classes.badge}
          style={{ backgroundColor: bg, color: color }}
        >
          {label}
        </Badge>
        <Text className={classes.area}>{vacancy.area.name}</Text>

        <Button
          className={clsx(classes.button, classes["button-apply"])}
          component="a"
          href={vacancy.alternate_url}
          target="_blank"
          rel="noreferrer"
          color="black.9"
        >
          Откликнуться на hh.ru
        </Button>
      </div>
      {vacancy.snippet ? (
        <div className={classes.card}>
          {vacancy.snippet.requirement && (
            <Group
              className={clsx(classes["wrapper-descr"], classes.requirement)}
            >
              <Text className={classes["requirement__title"]}>Требования:</Text>
              <Text
                className={clsx(classes.descr, classes["requirement__descr"])}
              >
                {vacancy.snippet.requirement}
              </Text>
            </Group>
          )}
          {vacancy.snippet.responsibility && (
            <Group
              className={clsx(classes["wrapper-descr"], classes.responsibility)}
            >
              <Text className={classes["responsibility__title"]}>
                Обязанности:
              </Text>
              <Text
                className={clsx(
                  classes.descr,
                  classes["responsibility__descr"]
                )}
              >
                {vacancy.snippet.responsibility}
              </Text>
            </Group>
          )}
        </div>
      ) : (
        <Text>Описание отсутствует</Text>
      )}
    </Group>
  );
};
