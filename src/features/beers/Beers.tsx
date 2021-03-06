import { useInfiniteQuery } from "react-query";
import BeersRepository from "services/beers/BeersRepository";
import Spinner from "components/spinner/Spinner";
import ListBeer from "./list/ListBeer";
import useInView from "shared/hooks/useInView";

function Beers() {
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

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Failed to get data</p>;
  }

  if (!data?.pages || !data.pages[0].length) {
    return <p>No data to display</p>;
  }

  return (
    <>
      <ListBeer data={data.pages.flat()} />
      {hasNextPage && <Spinner ref={loadMoreRef} />}
    </>
  );
}

export default Beers;
