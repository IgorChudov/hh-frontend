import { Skeleton, Group } from "@mantine/core";
import classes from "./VacancyCard.module.css";

export const VacancyCardSkeleton = () => {
  return (
    <div className={classes.card}>
      <Skeleton height={24} width="60%" radius="sm" mb={8} />

      <Group className={classes.wrapper} mb={8}>
        <Skeleton height={18} width={120} radius="sm" />
        <Skeleton height={18} width={100} radius="sm" />
      </Group>

      <Skeleton height={16} width={200} radius="sm" mb={8} />

      <Skeleton height={14} width={100} radius="sm" mb={8} />

      <Skeleton height={16} width={150} radius="sm" mb={8} />

      <Group className={classes.buttons}>
        <Skeleton height={36} width={160} radius="sm" />
        <Skeleton height={36} width={120} radius="sm" />
      </Group>
    </div>
  );
};
