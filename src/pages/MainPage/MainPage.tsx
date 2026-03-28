import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Title, Loader, Group, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { loadVacancies, setPage, setSearch, setCity, setSkills } from "../../entities/vacancies/model/vacanciesSlice";
import { SearchVacancies } from "../../features/SearchVacancies";
import { VacancyCard } from "../../widgets/VacancyCard/VacancyCard";
import { PaginationBar } from "../../widgets/PaginationBar/PaginationBar";
import { SideBar } from "../../widgets/SideBar/SideBar";
import classes from "./MainPage.module.css";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, loading, page, totalPages, skills, search, city } = useAppSelector(
    (state) => state.vacancies
  );
  const isFirstSync = useRef(true);
  const prevPageRef = useRef(page);
  const prevFiltersRef = useRef({ skills, search, city });

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlCity = searchParams.get("city") || "";
    const urlSkills = searchParams.get("skills")?.split(",").filter(Boolean) || [];
    const urlPage = Number(searchParams.get("page")) || 1;

    if (urlPage !== page) dispatch(setPage(urlPage));
    if (urlSearch && urlSearch !== search) dispatch(setSearch(urlSearch));
    if (urlCity && urlCity !== city) dispatch(setCity(urlCity));
    if (urlSkills.length && urlSkills.join(",") !== skills.join(",")) {
      dispatch(setSkills(urlSkills));
    }
  }, [searchParams]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (city) params.city = city;
    if (skills.length) params.skills = skills.join(",");
    if (page > 1) params.page = page.toString();

    if (isFirstSync.current) {
      setSearchParams(params, { replace: true });
      isFirstSync.current = false;
    } else {
      setSearchParams(params);
    }
  }, [search, city, skills, page]);

  useEffect(() => {
    const hasNewPage = page !== prevPageRef.current;
    const filtersChanged = skills.join(",") !== prevFiltersRef.current.skills.join(",") || search !== prevFiltersRef.current.search || city !== prevFiltersRef.current.city;

    if (items.length === 0 || hasNewPage || filtersChanged) {
      dispatch(loadVacancies());
    }

    prevPageRef.current = page;
    prevFiltersRef.current = {skills, search, city};
  }, [dispatch, page, items.length, skills, search, city]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

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
                <VacancyCard key={vacancy.id} vacancy={vacancy} onClick={() => navigate(`/vacancies/${vacancy.id}`, {state: { vacancy }})} />
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
