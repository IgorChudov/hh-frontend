import { useEffect } from "react";
import { Title, Loader, Group, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { loadVacancies, setPage } from "../../entities/vacancies/model/vacanciesSlice";
import { SearchVacancies } from "../../features/SearchVacancies";
import { VacancyCard } from "../../widgets/VacancyCard/VacancyCard";
import { PaginationBar } from "../../widgets/PaginationBar/PaginationBar";
import { SideBar } from "../../widgets/SideBar/SideBar";
import classes from "./MainPage.module.css";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { items, loading, page, totalPages, skills, search, city } = useAppSelector(
    (state) => state.vacancies
  );

  useEffect(() => {
    dispatch(loadVacancies());
  }, [page, skills, search, city, dispatch]);

  return (
    <div className={classes.container}>
      <Group className={classes.header}>
        <div>
          <Title order={2} className={classes.title}>
            Список вакансий
          </Title>
          <p className={classes.subtitle}>по профессии Frontend-разработчик</p>
        </div>

        <SearchVacancies />
      </Group>

      <Group className={classes.content}>
        <SideBar />
        <main className={classes.vacancies}>
          {loading ? (
            <Loader className={classes.load}/>
          ) : items.length === 0 ? (
            <Text className={classes.empty}>Вакансии не найдены</Text>
          ) : (
            <>
              {items.map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))}
              {totalPages > 1 && (
                <PaginationBar
                  page={page}
                  total={totalPages}
                  onChange={(p) => dispatch(setPage(p))}
                />
              )}
            </>
          )}
        </main>
      </Group>
    </div>
  );
};
