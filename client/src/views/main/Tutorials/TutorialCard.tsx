import { FC, useMemo } from "react";
import styled, { css } from "styled-components";
import Tag from "../../../components/Tag";
import { PgTutorial, TutorialData } from "../../../utils/pg";

const colors = ["#3C54D2", "#6D30B7", "#DBDBDB"];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const TutorialCard: FC<TutorialData> = ({ name, level, framework }) => {
  const backgroundColor = useMemo(getRandomColor, []); // memoize to keep the same color during re-renders

  return (
    <GradientWrapper onClick={() => PgTutorial.open(name)}>
      <BackgroundColor backgroundColor={backgroundColor} />
      <InsideWrapper>
        <InfoWrapper>
          <TopLeftSection>
            <Tag kind="level" value={level} />
          </TopLeftSection>

          <TopRightSection>
            {framework && <Tag kind="framework" value={framework} />}
          </TopRightSection>
          <BottomLeftSection>
            <NameRow>
              <Name>{name}</Name>
            </NameRow>
            <StartButton>Start Course</StartButton>
          </BottomLeftSection>
        </InfoWrapper>
      </InsideWrapper>
    </GradientWrapper>
  );
};

const GradientWrapper = styled.div`
  ${() => css`
    --img-height: 13.5rem;
    width: 280px;
    height: 232px;
    border-radius:  15px 15px 15px 15px;
    border: 2px 0px 0px 0px;
    position: relative;
    
    transform-style: preserve-3d;
    transition: transform 0.3s ease-in-out;

    &:hover {
      cursor: pointer;
      transform: translateY(-0.3rem);
      border: 1 solid #000;
    }
  `}
`;

const BackgroundColor = styled.div<{ backgroundColor: string }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0;
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius:  15px 15px 15px 15px;
  z-index: 1;
`;

const InsideWrapper = styled.div`
  border-radius: 8px;
  background-image: url('/card-bg-element.svg');
  background-position: right center;
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 0;
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 2;
`;

const InfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 3;
`;

const TopLeftSection = styled.div`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
`;

const NameRow = styled.div`
  display: flex;
  padding-right: 5rem;
  overflow: auto;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Name = styled.span`
  
  font-weight: bold;
  font-size: 1.3rem;
  color: #111111
`;

const TopRightSection = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
`;

const BottomLeftSection = styled.div`
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
`;

const StartButton = styled.button`
  background-color: #272727;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

export default TutorialCard;
