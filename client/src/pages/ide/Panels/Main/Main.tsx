import styled from "styled-components";
import MainView from "./MainView";
import Terminal from "./Terminal";

const Main = () => (
  <Wrapper>
    <MainView />
    <TerminalWrapper>
      <Terminal />
    </TerminalWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TerminalWrapper = styled.div`
  display: none; 
`;

export default Main;
