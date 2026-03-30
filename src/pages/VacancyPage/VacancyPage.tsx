import { Text, Button, Alert } from "@mantine/core";
import { useLocation, useNavigate } from "react-router";
import { VacancyCard } from "../../widgets/VacancyCard/VacancyCard";
import type { Vacancy } from "../../entities/vacancies/model/types";
import classes from "./VacancyPage.module.css";

export const VacancyPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const vacancy = state?.vacancy as Vacancy | null;

  if (!vacancy) {
    return (
      <div className={classes.container}>
        <Alert color="red" title="Вакансия не найдена">
          <Text>
            К сожалению, описание вакансии доступно только при переходе из
            списка вакансий. Вернитесь к списку вакансий.
          </Text>
          <Button mt="md" onClick={() => navigate("/")}>
            К списку вакансий
          </Button>
        </Alert>
      </div>
    );
  }

  const hasRequirements = !!vacancy.snippet?.requirement;
  const hasResponsibilities = !!vacancy.snippet?.responsibility;
  const hasSnippet = hasRequirements || hasResponsibilities;

  return (
    <div className={classes.container}>
      <VacancyCard vacancy={vacancy} variant="detail" />

      {hasSnippet ? (
        <div className={classes.card}>
          {hasRequirements && (
            <>
              <Text className={classes.title}>Требования</Text>
              <Text className={classes.text}>{vacancy.snippet.requirement}</Text>
            </>
          )}
          {hasResponsibilities && (
            <>
              <Text className={classes.subTitle}>Обязанности</Text>
              <Text>{vacancy.snippet.responsibility}</Text>
            </>
          )}
        </div>
      ) : (
        <Alert color="yellow" title="Подробное описание недоступно">
          <Text>
            К сожалению, подробное описание вакансии (требования и обязанности)
            доступно только при переходе из списка вакансий.
          </Text>
          <Button
            component="a"
            href={vacancy.alternate_url}
            target="_blank"
            rel="noreferrer"
            mt="md"
          >
            Открыть на hh.ru
          </Button>
        </Alert>
      )}
    </div>
  );
};
