import styled from "styled-components";

import { Editor } from "../../../components/Editor";
import { Tabs } from "../../../components/Tabs";
import Terminal from "../../../pages/ide/Panels/Main/Terminal";

export const EditorWithTabs = () => (
  <Wrapper>
    <Tabs />
    <Editor />
    <Terminal />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
