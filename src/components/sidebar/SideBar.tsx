import { useCallback, useState } from "react";
import {
  Group,
  Pill,
  PillGroup,
  TextInput,
  ActionIcon,
  Card,
  Text,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSkills, setPage } from "../../store/vacanciesSlice";
import classes from "./SideBar.module.css";

export const SideBar = () => {
  const dispatch = useAppDispatch();
  const skills = useAppSelector((state) => state.vacancies.skills);
  const [input, setInput] = useState("");

  const addSkill = useCallback(() => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const updated = [...skills, trimmed];
      dispatch(setSkills(updated));
      dispatch(setPage(1));
      setInput("");
    }
  }, [dispatch, input, skills]);

  const removeSkill = useCallback(
    (skill: string) => {
      const updated = skills.filter((s) => s !== skill);
      dispatch(setSkills(updated));
      dispatch(setPage(1));
    },
    [dispatch, skills]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addSkill();
      }
    },
    [addSkill]
  );

  return (
    <aside className={classes.sidebar}>
      <Card className={classes.card}>
        <Text fw={600} mb="sm" className={classes.title}>
          Ключевые навыки
        </Text>

        <Group className={classes.form}>
          <TextInput
            placeholder="Навык"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={classes["form__input"]}
          />
          <ActionIcon
            onClick={addSkill}
            className={classes["form__button"]}
            color="#228BE6"
          >
            <IconPlus />
          </ActionIcon>
        </Group>

        {skills.length > 0 && (
          <PillGroup className={classes.pills}>
            {skills.map((skill) => (
              <Pill
                key={skill}
                withRemoveButton
                onRemove={() => removeSkill(skill)}
                className={classes["pills__skill"]}
              >
                {skill}
              </Pill>
            ))}
          </PillGroup>
        )}
      </Card>
    </aside>
  );
};
