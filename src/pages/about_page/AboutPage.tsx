import { Card, Title, Text, Group } from "@mantine/core";
import classes from "./AboutPage.module.css";

export const AboutPage = () => {
  return (
    <Card className={classes.container}>
      <Group className={classes.wrapper}>
        <Title className={classes.title}>Игорь Чудов</Title>
        <Text className={classes.text}>
          Привет! Я - Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit.
        </Text>
      </Group>
    </Card>
  );
};