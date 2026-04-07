import { useCallback, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Group, Button, Text, Badge } from "@mantine/core";
import type { Vacancy } from "../../api/types";
import classes from "./VacancyCard.module.css";
import {
  formatSalary,
  formatExperience,
  getWorkFormat,
} from "../../utils/vacancyUtils";
import clsx from "clsx";

type Props = { vacancy: Vacancy };

export const VacancyCard = memo<Props>(({ vacancy }) => {
  const navigate = useNavigate();

  const handleViewVacancy = useCallback(() => {
    navigate(`/vacancies/${vacancy.id}`, { state: { vacancy } });
  }, [navigate, vacancy]);

  const { label, bg, color } = getWorkFormat(vacancy);

  const badgeStyle = useMemo(() => ({
    backgroundColor: bg,
    color: color,
  }), [bg, color]);

  return (
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
        style={badgeStyle}
      >
        {label}
      </Badge>
      <Text className={classes.area}>{vacancy.area.name}</Text>

      <Group className={classes.buttons}>
        <Button
          onClick={handleViewVacancy}
          className={clsx(classes.button, classes["button-view"])}
          color="black.9"
        >
          Смотреть вакансию
        </Button>
        <Button
          className={clsx(classes.button, classes["button-apply"])}
          component="a"
          href={vacancy.alternate_url}
          target="_blank"
          rel="noreferrer"
          color="ultraLight.9"
        >
          Откликнуться
        </Button>
      </Group>
    </div>
  );
});

VacancyCard.displayName = "VacancyCard";
