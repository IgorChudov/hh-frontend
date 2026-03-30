import { Skeleton } from "@mantine/core";
import classes from "./VacancyCard.module.css";

export const VacancyCardSkeleton = () => {
  return (
    <div className={classes.card}>
      <Skeleton height={24} width="70%" mb="sm" />
      <Skeleton height={20} width="40%" mb="md" />
      <Skeleton height={16} width="60%" mb="xs" />
      <Skeleton height={14} width="30%" mb="md" />
      <Skeleton height={36} width="100%" />
    </div>
  );
};
