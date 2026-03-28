import { Select, Card } from "@mantine/core";
import { useAppDispatch } from "../../../shared/hooks";
import { setCity, loadVacancies, setPage } from "../../../entities/vacancies/model/vacanciesSlice";
import LocationIcon from "../../../shared/assets/location-icon.svg?react";
import classes from "./FilterVacancies.module.css";

export const FilterVacancies = () => {
  const dispatch = useAppDispatch();

  const handleCityChange = (value: string | null) => {
    dispatch(setCity(value || ""));
    dispatch(setPage(1));
    dispatch(loadVacancies());
  };

  return (
    <Card className={classes.card}>
      <Select
      placeholder="Все города"
      data={["Все города", "Москва", "Санкт-Петербург"]}
      onChange={handleCityChange}
      className={classes.select}
      leftSection={<LocationIcon />}
      comboboxProps={{ shadow: "md" }}
      />
    </Card>

  );
};
