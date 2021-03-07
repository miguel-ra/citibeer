import { useCallback, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Beer } from "models/beers/Beer";
import useBeersRepository from "services/beers/useBeersRepository";
import useObserver from "shared/hooks/useObserver";
import { useModal } from "store/modalContext";
import Spinner from "components/spinner/Spinner";
import BeersList from "./list/BeersList";
import BeerDetail from "./detail/BeerDetail";
import { useBeers } from "./beersContext";

const observerOptions = { root: null, rootMargin: "300px", threshold: 0 };
const pageSize = 24;

function BeersData() {
  const [beers, setBeers] = useState<Beer[]>([]);
  const {
    favoriteIds,
    addFavorite,
    removeFavorite,
    filters: { showFavorites, ...filters },
  } = useBeers();
  const beerRepositroy = useBeersRepository({ showFavorites });
  const { openModal } = useModal();
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["beers", JSON.stringify(filters), favoriteIds.length, beerRepositroy],
    ({ pageParam = { per_page: pageSize, page: 1 } }) => {
      return beerRepositroy.getAll({ ...pageParam, ...filters });
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const lastPageIsEmpty = lastPage.length === 0;
        if (lastPageIsEmpty) {
          return undefined;
        }
        return { per_page: pageSize, page: pages.length + 1 };
      },
    }
  );
  const { ref: loadMoreRef } = useObserver(fetchNextPage, observerOptions);

  const handleBeerDetail = useCallback(
    (beer: Beer) => {
      openModal(
        <BeerDetail
          beer={beer}
          isFavorite={favoriteIds.includes(beer.id)}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      );
    },
    [addFavorite, favoriteIds, openModal, removeFavorite]
  );

  const lastPage = data?.pages[data.pages.length - 1];

  useEffect(() => {
    if (!isLoading) {
      const newBeers = data?.pages ? data.pages.flat() : [];
      setBeers(newBeers);
    }
  }, [data, isLoading]);

  if (isLoading && !beers.length) {
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
