import { Card, Text } from "@mantine/core";
import { ManageSkills } from "../../features/ManageSkills";
import classes from "./SkillsPills.module.css";

export const SkillsPills = () => {
  return (
    <Card className={classes.card}>
      <Text fw={600} mb="sm" className={classes.title}>
        Ключевые навыки
      </Text>
      <ManageSkills />
    </Card>
  );
};
