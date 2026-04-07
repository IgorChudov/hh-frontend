import { VacancyCard } from "../vacancy_card/VacancyCard";
import { VacancyCardSkeleton } from "../vacancy_card/VacancyCardSkeleton";
import { PaginationBar } from "../pagination_bar/PaginationBar";
import { useOutletContext } from "react-router-dom";
import type { Vacancy } from "../../api/types";

interface VacanciesOutletContext {
  items: Vacancy[];
  loading: boolean;
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
}

export const VacanciesList = () => {
  const { items, loading, totalPages, page, onPageChange } =
    useOutletContext<VacanciesOutletContext>();

  return (
    <main>
      {loading ? (
        Array.from({ length: 10 }).map((_, i) => (
          <VacancyCardSkeleton key={i} />
        ))
      ) : (
        <>
          {items.map((vacancy: Vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
          {totalPages > 1 && (
            <PaginationBar
              key={page}
              page={page}
              total={totalPages}
              onChange={onPageChange}
            />
          )}
        </>
      )}
    </main>
  );
};
