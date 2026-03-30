import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router";
import { Title, Group, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { loadVacancies, setPage, setSearch, setCity, setSkills } from "../../entities/vacancies/model/vacanciesSlice";
import { SearchVacancies } from "../../features/SearchVacancies";
import { VacancyCard } from "../../widgets/VacancyCard/VacancyCard";
import { VacancyCardSkeleton } from "../../widgets/VacancyCard/VacancyCardSkeleton";
import { PaginationBar } from "../../widgets/PaginationBar/PaginationBar";
import { SideBar } from "../../widgets/SideBar/SideBar";
import classes from "./MainPage.module.css";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { items, loading, page, totalPages, skills, search, city } = useAppSelector(
    (state) => state.vacancies
  );

  const prevPageRef = useRef(page);
  const prevSearchRef = useRef(search);
  const prevCityRef = useRef(city);
  const prevSkillsRef = useRef<string[]>([]);

  const isInitialMountRef = useRef(true);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlCity = searchParams.get("city") || "";
    const urlSkills = searchParams.get("skills")?.split(",").filter(Boolean) || [];
    const urlPage = Number(searchParams.get("page")) || 1;

    const pageChanged = urlPage !== page;
    const searchChanged = urlSearch && urlSearch !== search;
    const cityChanged = urlCity && urlCity !== city;
    const skillsChanged = searchParams.has("skills") && urlSkills.join(",") !== skills.join(",");

    if (!isInitialMountRef.current) {
      return;
    }

    if (pageChanged) dispatch(setPage(urlPage));
    if (searchChanged) dispatch(setSearch(urlSearch));
    if (cityChanged) dispatch(setCity(urlCity));
    if (skillsChanged) dispatch(setSkills(urlSkills));

    isInitialMountRef.current = false;
  }, [searchParams, location.key, page, search, city, skills, dispatch]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (city) params.city = city;
    if (skills.length) params.skills = skills.join(",");
    if (page > 1) params.page = page.toString();

    const shouldReplace = isInitialMountRef.current;
    setSearchParams(params, { replace: shouldReplace });
  }, [search, city, skills, page, setSearchParams, isInitialMountRef]);

  useEffect(() => {
    const hasNewPage = page !== prevPageRef.current;
    const skillsChanged = skills.join(",") !== prevSkillsRef.current.join(",");
    const searchChanged = search !== prevSearchRef.current;
    const cityChanged = city !== prevCityRef.current;
    const filtersChanged = skillsChanged || searchChanged || cityChanged;

    if (items.length === 0 || hasNewPage || filtersChanged) {
      dispatch(loadVacancies({ page, search }));
    }

    prevPageRef.current = page;
    prevSkillsRef.current = [...skills];
    prevSearchRef.current = search;
    prevCityRef.current = city;
  }, [dispatch, page, items.length, skills, search, city]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, items.length]);

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
            <div className={classes.skeletons}>
              {Array.from({ length: 10 }).map((_, i) => (
                <VacancyCardSkeleton key={i} />
              ))}
            </div>
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
