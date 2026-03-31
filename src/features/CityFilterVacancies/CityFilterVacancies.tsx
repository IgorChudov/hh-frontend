import { Tabs } from '@mantine/core';
import classes from "./CityFilterVacancies.module.css";

export function CityFilterVacancies() {
  return (
    <Tabs radius="xs" defaultValue="gallery" className={classes.tabs} color="darkPrimary.6">
      <Tabs.List className={classes["tabs__list"]}>
        <Tabs.Tab value="gallery" className={classes["tabs__item"]}>
          Москва
        </Tabs.Tab>
        <Tabs.Tab value="messages">
          Санкт-Петербург
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
