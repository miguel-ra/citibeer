import { useCallback, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import useObserver from "shared/hooks/useObserver";
import { useModal } from "store/modalContext";
import Spinner from "components/spinner/Spinner";
import { BeerView, useBeerView } from "./beerViewModel";
import BeerDetail from "./detail/BeerDetail";
import BeersList from "./list/BeersList";
import BeersGrid from "./grid/BeersGrid";
import { useBeers } from "./beersContext";
import classes from "./BeersData.module.scss";

const observerOptions = { root: null, rootMargin: "300px", threshold: 0 };
const pageSize = 24;

function BeersData() {
  const [beers, setBeers] = useState<BeerView[]>([]);
  const {
    savedIds,
    saveBeer,
    removeBeer,
    options: { showSaved, viewMode, ...filters },
  } = useBeers();
  const { getAll, beerRepositroy } = useBeerView({ showSaved });
  const { openModal } = useModal();
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [
      "beers",
      JSON.stringify(filters),
      showSaved ? savedIds.length : 0,
      beerRepositroy,
    ],
    ({ pageParam = { per_page: pageSize, page: 1 } }) => {
      return getAll({ ...pageParam, ...filters });
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
    (beer: BeerView) => {
      openModal(
        <BeerDetail
          beer={beer}
          isSaved={savedIds.includes(beer.id)}
          saveBeer={saveBeer}
          removeBeer={removeBeer}
        />
      );
    },
    [saveBeer, savedIds, openModal, removeBeer]
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
    return <div className={classes.errorMessage}>Failed to get data</div>;
  }

  if (!beers.length) {
    return <div className={classes.errorMessage}>No data to display</div>;
  }

  const Component = viewMode === "list" ? BeersList : BeersGrid;

  return (
    <>
      <Component data={beers} onShowDetails={handleBeerDetail} />
      {hasNextPage && lastPage?.length === pageSize && (
        <Spinner ref={loadMoreRef} visible />
      )}
    </>
  );
}

export default BeersData;
