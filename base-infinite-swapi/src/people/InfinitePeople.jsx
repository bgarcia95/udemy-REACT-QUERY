import InfiniteScroll from "react-infinite-scroller";

import { useInfiniteQuery } from "react-query";

import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // fetchNextPage fn to use to tell infiniteScroll what function to run when we want more data
  // hasNextPage boolean that determine wether or not there is more data to collect
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, error } =
    useInfiniteQuery(
      "sw-people",
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.next || undefined,
      }
    );

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div>Error! {error.toString()}</div>;

  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        <>
          {data.pages.map((pageData) => {
            return pageData?.results.map((person) => {
              return (
                <Person
                  key={person.name}
                  name={person.name}
                  eyeColor={person.eye_color}
                  hairColor={person.hair_color}
                />
              );
            });
          })}
        </>
      </InfiniteScroll>
    </>
  );
}
