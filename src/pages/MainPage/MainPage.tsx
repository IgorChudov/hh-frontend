import { useEffect, useRef, useMemo } from "react";
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
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, loading, page, totalPages, skills, search, city } = useAppSelector(
    (state) => state.vacancies
  );

  // Refs для отслеживания предыдущих значений (объявляем до useEffect)
  const prevPageRef = useRef(page);
  const prevSearchRef = useRef(search);
  const prevCityRef = useRef(city);

  // Флаг: true только для первоначальной синхронизации URL → Redux
  const isInitialMountRef = useRef(true);
  // Флаг: предотвращает обратную синхронизацию Redux → URL во время обработки URL
  const isSyncingFromUrlRef = useRef(false);

  // Сравнение массивов навыков через useMemo для стабильности
  const skillsString = useMemo(() => skills.join(","), [skills]);
  const prevSkillsStringRef = useRef(skillsString);

  // === 1. Синхронизация URL → Redux (только при монтировании и навигации браузера) ===
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlCity = searchParams.get("city") || "";
    const urlSkills = searchParams.get("skills")?.split(",").filter(Boolean) || [];
    const urlPage = Number(searchParams.get("page")) || 1;

    const urlSkillsString = urlSkills.join(",");

    // Проверяем, есть ли изменения
    const pageChanged = urlPage !== page;
    const searchChanged = urlSearch && urlSearch !== search;
    const cityChanged = urlCity && urlCity !== city;
    const skillsChanged = urlSkills.length > 0 && urlSkillsString !== skillsString;

    // Если ничего не изменилось — выходим
    if (!pageChanged && !searchChanged && !cityChanged && !skillsChanged) {
      return;
    }

    // Помечаем, что синхронизация идёт из URL
    isSyncingFromUrlRef.current = true;

    if (pageChanged) dispatch(setPage(urlPage));
    if (searchChanged) dispatch(setSearch(urlSearch));
    if (cityChanged) dispatch(setCity(urlCity));
    if (skillsChanged) dispatch(setSkills(urlSkills));

    // Сбрасываем флаг после применения всех изменений
    isSyncingFromUrlRef.current = false;
    isInitialMountRef.current = false;
  }, [searchParams]);

  // === 2. Синхронизация Redux → URL (при изменении состояния) ===
  useEffect(() => {
    // Пропускаем, если синхронизация идёт из URL (чтобы не было цикла)
    if (isSyncingFromUrlRef.current) {
      return;
    }

    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (city) params.city = city;
    if (skills.length) params.skills = skills.join(",");
    if (page > 1) params.page = page.toString();

    // При первом рендере используем replace, чтобы не добавлять запись в историю
    const shouldReplace = isInitialMountRef.current;
    setSearchParams(params, { replace: shouldReplace });
  }, [search, city, skillsString, page]);

  // === 3. Загрузка вакансий при изменении параметров ===
  useEffect(() => {
    const hasNewPage = page !== prevPageRef.current;
    const skillsChanged = skillsString !== prevSkillsStringRef.current;
    const searchChanged = search !== prevSearchRef.current;
    const cityChanged = city !== prevCityRef.current;
    const filtersChanged = skillsChanged || searchChanged || cityChanged;

    // Загружаем, если:
    // - это первая загрузка (items.length === 0)
    // - изменилась страница
    // - изменились фильтры
    if (items.length === 0 || hasNewPage || filtersChanged) {
      dispatch(loadVacancies({ page, search }));
    }

    prevPageRef.current = page;
    prevSkillsStringRef.current = skillsString;
    prevSearchRef.current = search;
    prevCityRef.current = city;
  }, [dispatch, page, items.length, skillsString, search, city]);

  // === 4. Скролл к началу при смене страницы ===
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
