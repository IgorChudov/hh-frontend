import { Group, Button, Text, Badge } from "@mantine/core";
import type { Vacancy } from "../../entities/vacancies/model/types";
import classes from "./VacancyCard.module.css";
import clsx from "clsx";

type Props = { vacancy: Vacancy };

export const VacancyCard: React.FC<Props> = ({ vacancy }) => {
  const formatNumber = (num?: number) => {
    if (!num) return "";
    return new Intl.NumberFormat("ru-RU").format(num);
  };

  const formatCurrency = (currencyName?: string) => {
    if (currencyName?.includes("RUR")) return "₽";
    if (currencyName?.includes("KZT")) return "₸";
    if (currencyName?.includes("USD")) return "$";
    return currencyName;
  };

  const salary = vacancy.salary
    ? `${vacancy.salary.from ? `${formatNumber(vacancy.salary.from)}` : ""} ${
        vacancy.salary.to ? `– ${formatNumber(vacancy.salary.to)}` : ""
      } ${formatCurrency(vacancy.salary.currency) || ""}`
    : "Не указана";

  const formatExperience = (experienceName?: string) => {
    if (!experienceName) return "Не указано";

    const normalized = experienceName.toLowerCase().trim();

    if (normalized.includes("нет опыта")) {
      return "Без опыта";
    }

    if (/от\s*\d+.*до\s*\d+/i.test(normalized)) {
      const match = normalized.match(/от\s*(\d+).+до\s*(\d+)/i);
      if (match) {
        const from = Number(match[1]);
        const to = Number(match[2]);
        const yearsWord = to > 5 ? "лет" : "года";
        return `Опыт ${from}–${to} ${yearsWord}`;
      }
    }

    return experienceName;
  };

  const getWorkFormatData = (formatId: string) => {
    switch (formatId) {
      case "REMOTE":
        return {
          label: "Можно удалённо",
          bg: "var(--mantine-color-primary-4)",
          color: "var(--mantine-color-white-0)",
        };
      case "ON_SITE":
        return {
          label: "Офис",
          bg: "var(--mantine-color-ultraLight-9)",
          color: "var(--mantine-color-gray-9)",
        };
      case "HYBRID":
        return {
          label: "Гибрид",
          bg: "var(--mantine-color-black-9)",
          color: "var(--mantine-color-white-0)",
        };
      default:
        return {
          label: "Не указано",
          bg: "var(--mantine-color-gray-1)",
          color: "var(--mantine-color-black-9)",
        };
    }
  };

  const workFormat = vacancy.work_format?.[0];
  const { label, bg, color } = workFormat
    ? getWorkFormatData(workFormat.id)
    : {
        label: "Не указано",
        bg: "var(--mantine-color-gray-1)",
        color: "var(--mantine-color-black-9)",
      };

  return (
    <div className={classes.card}>
      <Text className={classes.title}>{vacancy.name}</Text>
      <Group className={classes.wrapper}>
        <Text className={classes.salary}>{salary}</Text>
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

      <Group className={classes.buttons}>
        <Button
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
};
