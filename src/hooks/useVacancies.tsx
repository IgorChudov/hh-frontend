import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  loadVacancies,
  setPage,
  setSearch,
  setCity,
  setSkills,
} from "../store/vacanciesSlice";

export const useVacancies = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { items, loading, page, totalPages, search, city, skills } =
    useAppSelector((state) => state.vacancies);
  const [localSearch, setLocalSearch] = useState(search);

  // Синхронизация localSearch с Redux search (например, после resetVacancies)
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Синхронизация URL -> Redux только при первом рендере (initial mount)
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlSkillsParam = searchParams.get("skills");
    const urlSkills = urlSkillsParam
      ? urlSkillsParam.split(",").filter(Boolean)
      : [];
    const urlPage = Number(searchParams.get("page")) || 1;
    const urlCity = location.pathname.includes("moscow")
      ? "moscow"
      : location.pathname.includes("petersburg")
        ? "petersburg"
        : "";

    if (urlCity && urlCity !== city) dispatch(setCity(urlCity));
    if (urlSearch && urlSearch !== search) {
      dispatch(setSearch(urlSearch));
      setLocalSearch(urlSearch);
    }
    if (urlSkills.length > 0 && urlSkills.join(",") !== skills.join(",")) {
      dispatch(setSkills(urlSkills));
    }
    if (urlPage !== page) dispatch(setPage(urlPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Только один раз при маунте

  // Синхронизация Redux -> URL (params)
  useEffect(() => {
    const params: Record<string, string> = {};

    if (search) params.search = search;
    if (skills.length > 0) params.skills = skills.join(",");
    if (page > 1) params.page = page.toString();

    setSearchParams(params);
  }, [search, skills, page, setSearchParams]);

  // Синхронизация city с pathname и навигация
  useEffect(() => {
    const params = searchParams.toString();
    const query = params ? `?${params}` : "";
    let targetPathname = `/vacancies`;

    if (city === "moscow") {
      targetPathname = "/vacancies/moscow";
    } else if (city === "petersburg") {
      targetPathname = "/vacancies/petersburg";
    }

    const targetPath = `${targetPathname}${query}`;

    // Навигация только если pathname не совпадает (игнорируем query params)
    if (!location.pathname.startsWith(targetPathname)) {
      navigate(targetPath, { replace: true });
    }
  }, [city, searchParams, navigate, location.pathname]);

  // Загрузка данных при изменении фильтров
  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(loadVacancies());
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [page, search, city, skills, dispatch]);

  const handleSearch = useCallback(() => {
    dispatch(setSearch(localSearch));
    dispatch(setPage(1));
  }, [dispatch, localSearch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        dispatch(setSearch(localSearch));
        dispatch(setPage(1));
      }
    },
    [dispatch, localSearch]
  );

  const handlePageChange = useCallback(
    (p: number) => {
      dispatch(setPage(p));
    },
    [dispatch]
  );

  const handleTabSelect = useCallback(
    (tab: "moscow" | "petersburg") => {
      dispatch(setCity(tab));
      dispatch(setPage(1));
    },
    [dispatch]
  );

  return {
    items,
    loading,
    page,
    search,
    skills,
    city,
    totalPages,
    localSearch,
    setLocalSearch,
    handleSearch,
    handleKeyDown,
    handlePageChange,
    handleTabSelect,
  };
};
