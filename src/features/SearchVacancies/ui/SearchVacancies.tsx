import { useEffect, useState } from "react";
import { Group, TextInput, Button } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { setSearch, loadVacancies, setPage } from "../../../entities/vacancies/model/vacanciesSlice";
import SearchIcon from "../../../shared/assets/search-icon.svg?react";
import classes from "./SearchVacancies.module.css";

export const SearchVacancies = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.vacancies.search);
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    if (localSearch !== search) {
      setLocalSearch(search);
    }
  }, [search]);

  const handleSearch = () => {
    dispatch(setSearch(localSearch));
    dispatch(setPage(1));
    dispatch(loadVacancies());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Group className={classes.container}>
      <TextInput
        placeholder="Должность или название компании"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className={classes.input}
        leftSection={<SearchIcon />}
      />
      <Button
        className={classes.button}
        color="primary.4"
        onClick={handleSearch}
      >
        Найти
      </Button>
    </Group>
  );
};
