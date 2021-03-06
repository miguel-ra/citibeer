import { useInfiniteQuery } from "react-query";
import BeersRepository from "services/beers/BeersRepository";
import useInView from "shared/hooks/useInView";
import ConditionalRender from "components/layout/ConditionalRender";
import Spinner from "components/spinner/Spinner";
import BeersList from "./list/BeersList";
import BeersFilters from "./filters/BeersFilters";

function BeersCatalog() {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    "beers",
    ({ pageParam }) => {
      return BeersRepository.getAll(pageParam);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const lastPageIsEmpty = lastPage.length === 0;
        if (lastPageIsEmpty) {
          return undefined;
        }
        return { page: pages.length };
      },
    }
  );

  const { ref: loadMoreRef } = useInView(fetchNextPage);

  const beers = data?.pages ? data.pages.flat() : [];

  return (
    <>
      <BeersFilters />
      <ConditionalRender
        conditions={[
          [isLoading, <Spinner />],
          [isError, <p>Failed to get data</p>],
          [!beers.length, <p>No data to display</p>],
        ]}
      >
        <>
          <BeersList data={beers} />
          {hasNextPage && <Spinner ref={loadMoreRef} />}
        </>
      </ConditionalRender>
    </>
  );
}

export default BeersCatalog;
