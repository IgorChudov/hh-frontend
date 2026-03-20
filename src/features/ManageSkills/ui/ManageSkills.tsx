import { useState } from "react";
import { Group, Pill, PillGroup, TextInput, ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { setSkills, setPage } from "../../../entities/vacancies/model/vacanciesSlice";
import classes from "./ManageSkills.module.css";

export const ManageSkills = () => {
  const dispatch = useAppDispatch();
  const skills = useAppSelector((state) => state.vacancies.skills);
  const [input, setInput] = useState("");

  const addSkill = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const updated = [...skills, trimmed];
      dispatch(setSkills(updated));
    }
    setInput("");
  };

  const removeSkill = (skill: string) => {
    const updated = skills.filter((s) => s !== skill);
    dispatch(setSkills(updated));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <Group className={classes.container}>
      <Group className={classes.form}>
        <TextInput
          placeholder="Навык"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={classes.input}
        />
        <ActionIcon
          onClick={addSkill}
          className={classes.button}
          color="blue.6"
        >
          <IconPlus />
        </ActionIcon>
      </Group>

      <Group className={classes.pills}>
        <PillGroup>
          {skills.map((skill) => (
            <Pill
              key={skill}
              withRemoveButton
              onRemove={() => removeSkill(skill)}
              className={classes.pill}
            >
              {skill}
            </Pill>
          ))}
        </PillGroup>
      </Group>
    </Group>
  );
};
