import { Card, Image, Title, Text, Group, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import sadCatGif from "../../assets/sad-cat.gif";
import classes from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackToVacanciesPage = () => {
    navigate(`/vacancies`);
  };

  return (
    <Card className={classes.container}>
      <Group className={classes.wrapper}>
        <Group className={classes["wrapper-text"]}>
          <Title className={classes.title}>
            Упс! Такой страницы не существует
          </Title>
          <Text className={classes.text}>Давайте перейдём к началу.</Text>
        </Group>
        <Button
          onClick={handleBackToVacanciesPage}
          className={classes.button}
          color="primary.4"
        >
          На главную
        </Button>
      </Group>
      <Image className={classes.img} src={sadCatGif} alt="Грустный кот" />
    </Card>
  );
};
