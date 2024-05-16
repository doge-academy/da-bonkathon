import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

interface FilterGroupProps {
  param: string;
  filters: readonly string[];
}

const FilterGroup: FC<FilterGroupProps> = ({ param, filters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValues = searchParams.getAll(param);

  const handleFilterClick = (filter: string) => {
    if (searchValues.includes(filter)) {
      const otherValues = searchValues.filter((f) => f !== filter);
      searchParams.delete(param);
      for (const otherValue of otherValues) {
        searchParams.append(param, otherValue);
      }
    } else {
      searchParams.append(param, filter);
    }

    setSearchParams(searchParams, { replace: true });
  };

  return (
    <FilterGroupWrapper>
      <FiltersContainer>
        {filters.filter(Boolean).map((filter) => (
          <FilterButton
            key={filter}
            selected={searchValues.includes(filter)}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </FilterButton>
        ))}
      </FiltersContainer>
    </FilterGroupWrapper>
  );
};

const FilterGroupWrapper = styled.div`
  padding: 0.25rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  
`;

const FilterButton = styled.button<{ selected: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid #ccc;
  background-color: ${({ selected }) => (selected ? "#fff" : "#222222")};
  color: ${({ selected }) => (selected ? "#000" : "#FFF")};
  border-radius: 1000px;
  cursor: pointer;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#fff" : "#f0f0f0")};
    color: #000;
  }
`;

export default FilterGroup;
