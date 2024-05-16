import PopularTutorialCard from "./PopularTutorialCard"; // Import the new component
import TutorialCard from "./TutorialCard";
import FilterGroup from "../../../components/FilterGroup";
import Link from "../../../components/Link";
import SearchBar from "../../../components/SearchBar";
import Text from "../../../components/Text";
import { FILTERS, sortByLevel } from "./filters";
import { Sad } from "../../../components/Icons";
import { useFilteredSearch } from "../../../hooks";
import { GITHUB_URL } from "../../../constants";
import { PgTutorial } from "../../../utils/pg";
/**
 * Tutorial items sorted by date.
 *
 * The first 2 tutorials are kept as featured tutorials. The remaining tutorials are sorted from the newest to the oldest.
 */
const tutorials = [
  ...PgTutorial.tutorials.slice(0, 2),
  ...PgTutorial.tutorials.slice(2).sort(() => -1),
];

export const Tutorials = () => {
  const filteredSearch = useFilteredSearch({
    route: "/tutorials",
    items: tutorials,
    filters: FILTERS,
    sort: sortByLevel,
  });
  if (!filteredSearch) return null;

  const { regularItems, searchBarProps } = filteredSearch;

  return (
    <div className="flex flex-col w-full h-full overflow-scroll text-text-primary">
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-center  w-full pt-48 pb-8">
          <div className="w-[max(10rem,30%)]">
            <SearchBar
              {...searchBarProps}
              placeholder="Search tutorials"
              searchButton={{ position: "right", width: "2.5rem" }}
              className="text-text-primary"
            />
          </div>
        </div>
{regularItems.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 p-6 mx-auto max-w-7xl">
              {regularItems.slice(0, 2).map((t) => (
                <PopularTutorialCard key={t.name} {...t} />
              ))}
            </div>
          )}
        <div className="flex flex-col flex-1 mx-auto">
          <div className="flex flex-wrap max-w-6xl p-6 rounded-t-lg">
            {FILTERS.map((f) => (
              <FilterGroup key={f.param} {...f} />
            ))}
          </div>
          {!regularItems.length && <NoMatch />}

          

          {regularItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 mx-auto max-w-7xl rounded-b-lg">
              {regularItems.map((t) => (
                <TutorialCard key={t.name} {...t} />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center items-center w-full min-h-[5rem] max-h-[5rem] mt-8">
          <Link href={`${GITHUB_URL}/tree/master/client/src/tutorials`} className="text-cyan hover:underline">
            Contribute
          </Link>
        </div>
      </div>
    </div>
  );
};

const NoMatch = () => (
  <div className="flex justify-center items-center flex-1">
    <Text className="w-[21rem] h-[5rem] text-sm text-text-secondary" icon={<Sad />}>
      No match found
    </Text>
  </div>
);

export default Tutorials;
