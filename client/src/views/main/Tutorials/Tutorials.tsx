import styled from "styled-components";
import FeaturedTutorial from "./FeaturedTutorial";
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
 * The first 3 tutorials are kept in order because they are essential "Hello
 * world" tutorials. The remaining tutorials are sorted from the newest to the
 * oldest.
 */
const tutorials = [
  ...PgTutorial.tutorials.slice(0, 3),
  ...PgTutorial.tutorials.slice(3).sort(() => -1),
];

export const Tutorials = () => {
  const filteredSearch = useFilteredSearch({
    route: "/tutorials",
    items: tutorials,
    filters: FILTERS,
    sort: sortByLevel,
  });
  if (!filteredSearch) return null;

  const { featuredItems, regularItems, searchBarProps } = filteredSearch;

  return (
    <Wrapper>
      <InnerWrapper>
        <TopSection>
          <SearchBar
            {...searchBarProps}
            placeholder="Search tutorials"
            searchButton={{ position: "right", width: "2.5rem" }}
          />
        </TopSection>

        <MainSection>
          <TutorialsWrapper>
            <FiltersWrapper>
              {FILTERS.map((f) => (
                <FilterGroup key={f.param} {...f} />
              ))}
            </FiltersWrapper>
            {!featuredItems.length && !regularItems.length && <NoMatch />}

            {featuredItems.length > 0 && (
              <FeaturedTutorial tutorial={featuredItems[0]} />
            )}

            {regularItems.length > 0 && (
              <RegularTutorialsWrapper>
                {regularItems.map((t) => (
                  <TutorialCard key={t.name} {...t} />
                ))}
              </RegularTutorialsWrapper>
            )}
          </TutorialsWrapper>
        </MainSection>

        <BottomSection>
          <Link href={`${GITHUB_URL}/tree/master/client/src/tutorials`}>
            Contribute
          </Link>
        </BottomSection>
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  width: 100%;
  height: 100%;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 10rem;
  padding-bottom: 2rem;
  background-image: url('/background.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  /** Search bar */
  & > div {
    width: max(10rem, 30%);
  }
`;

const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  background: ${({ theme }) => theme.components.main.default.bg};
  border-radius: ${({ theme }) => theme.default.borderRadius};
`;

const FiltersWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  flex-wrap: wrap;
  padding-left: 1.5rem;
  border-top-left-radius: ${({ theme }) => theme.default.borderRadius};
  border-top-right-radius: ${({ theme }) => theme.default.borderRadius};
  background: ${({ theme }) => theme.components.main.default.bg};
`;

const TutorialsWrapper = styled.div`
  flex: 1;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: ${({ theme }) => theme.components.main.default.bg};
  border-bottom-left-radius: ${({ theme }) => theme.default.borderRadius};
  border-bottom-right-radius: ${({ theme }) => theme.default.borderRadius};
`;

const RegularTutorialsWrapper = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  gap: 0.9rem;
`;

const NoMatch = () => (
  <NoMatchWrapper>
    <NoMatchText icon={<Sad />}>No match found</NoMatchText>
  </NoMatchWrapper>
);

const NoMatchWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoMatchText = styled(Text)`
  width: 21rem;
  height: 5rem;
  font-size: ${({ theme }) => theme.font.other.size.small};
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 5rem;
  max-height: 5rem;
`;

export default Tutorials;
