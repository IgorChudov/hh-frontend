import { useMemo, useCallback } from "react";
import { Title, Group, TextInput, Button, Tabs } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { useVacancies } from "../../hooks/useVacancies";
import { setPage, setSearch } from "../../store/vacanciesSlice";
import { SideBar } from "../../components/sidebar/SideBar";
import SearchIcon from "../../assets/search-icon.svg?react";
import classes from "./VacanciesPage.module.css";

export const VacanciesPage = () => {
  const dispatch = useAppDispatch();

  const {
    items,
    loading,
    totalPages,
    page,
    city,
    localSearch,
    setLocalSearch,
    handleSearch,
    handleKeyDown,
    handlePageChange,
    handleTabSelect,
  } = useVacancies();

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    if (value === "") {
      dispatch(setSearch(""));
      dispatch(setPage(1));
    }
  }, [dispatch, setLocalSearch]);

  const contextValue = useMemo(() => ({
    items,
    loading,
    totalPages,
    page,
    onPageChange: handlePageChange,
  }), [items, loading, totalPages, page, handlePageChange]);

  return (
    <div className={classes.container}>
      <Group className={classes.header}>
        <div>
          <Title order={2} className={classes.title}>
            Список вакансий
          </Title>
          <p className={classes.subtitle}>по профессии Frontend-разработчик</p>
        </div>

        <Group className={classes.search}>
          <TextInput
            placeholder="Должность или название компании"
            value={localSearch}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            className={classes["search__input"]}
            leftSection={<SearchIcon />}
          />
          <Button
            className={classes["search__button"]}
            color="primary.4"
            onClick={handleSearch}
          >
            Найти
          </Button>
        </Group>
      </Group>

      <Group className={classes.content}>
        <SideBar />
        <Group className={classes.vacancies}>
          <Tabs
            value={city || null}
            onChange={(v) => handleTabSelect(v as "moscow" | "petersburg")}
            className={classes.tabs}
            color="darkPrimary.6"
          >
            <Tabs.List className={classes["tabs__list"]}>
              <Tabs.Tab className={classes["tabs__item"]} value="moscow">
                Москва
              </Tabs.Tab>
              <Tabs.Tab className={classes["tabs__item"]} value="petersburg">
                Санкт-Петербург
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Outlet context={contextValue} />
        </Group>
      </Group>
    </div>
  );
};
