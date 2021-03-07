import { useInfiniteQuery } from "react-query";
import BeersRepository from "services/beers/BeersRepository";
import useObserver from "shared/hooks/useObserver";
import Spinner from "components/spinner/Spinner";
import BeersList from "./list/BeersList";
import { useFilters } from "./filters/filtersContext";
import { useModal } from "store/modalContext";
import { useCallback } from "react";
import { Beer } from "models/beers/Beer";
import BeerDetail from "./detail/BeerDetail";

const observerOptions = { rootMargin: "300px" };
const pageSize = 25;

function BeersData() {
  const { filters } = useFilters();
  const { openModal } = useModal();
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["beers", JSON.stringify(filters)],
    ({ pageParam = { page: 1 } }) => {
      return BeersRepository.getAll({ ...pageParam, ...filters });
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const lastPageIsEmpty = lastPage.length === 0;
        if (lastPageIsEmpty) {
          return undefined;
        }
        return { pageSize, page: pages.length + 1 };
      },
    }
  );
  const { ref: loadMoreRef } = useObserver(fetchNextPage, observerOptions);

  const handleBeerDetail = useCallback(
    (beer: Beer) => {
      openModal(<BeerDetail data={beer} />);
    },
    [openModal]
  );

  const lastPage = data?.pages[data.pages.length - 1];
  const beers = data?.pages ? data.pages.flat() : [];

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Failed to get data</p>;
  }

  if (!beers.length) {
    return <p>No data to display</p>;
  }

  return (
    <>
      <BeersList data={beers} onShowDetails={handleBeerDetail} />
      {hasNextPage && lastPage?.length === pageSize && (
        <Spinner ref={loadMoreRef} visible />
      )}
    </>
  );
}

export default BeersData;
