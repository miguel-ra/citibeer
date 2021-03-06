import { useQuery } from "react-query";
import BeersRepository from "services/beers/BeersRepository";
import Spinner from "components/spinner/Spinner";
import ListBeer from "./list/ListBeer";

function Beers() {
  const { data, isLoading, isError } = useQuery(
    "beers",
    BeersRepository.getAll
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Failed to get data</p>;
  }

  if (!data?.length) {
    return <p>No data to display</p>;
  }

  return <ListBeer data={data} />;
}

export default Beers;
