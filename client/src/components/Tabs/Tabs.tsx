import { SetStateAction, useCallback } from "react";
import styled, { css } from "styled-components";
import Tab from "./Tab";
import Dnd from "../Dnd";
import { Id } from "../../constants";
import { PgExplorer, PgTheme } from "../../utils/pg";
import {
  useExplorer,
  useKeybind,
  useRenderOnChange,
} from "../../hooks";
import Wallet from "../Wallet";

export const Tabs = () => {
  // Without this, tabs flicker after reorder
  useRenderOnChange(PgExplorer.onDidSetTabs);

  const { explorer } = useExplorer();

  const setItems = useCallback((action: SetStateAction<string[]>) => {
    const newTabs =
      typeof action === "function"
        ? action(PgExplorer.tabs as string[])
        : action;
    PgExplorer.setTabs(newTabs);
  }, []);

  // Close the current tab with keybind
  useKeybind(
    "Alt+W",
    () => {
      if (PgExplorer.currentFilePath) {
        PgExplorer.closeFile(PgExplorer.currentFilePath);
      }
    },
    []
  );

  if (!explorer.tabs.length) return null;

  return (
    <Wrapper id={Id.TABS}>
      <TabsWrapper>
        <Dnd.Sortable
          items={explorer.tabs as string[]}
          setItems={setItems}
          Item={Tab}
          getItemProps={(path, index) => ({ path, index })}
          strategy="horizontal"
        />
      </TabsWrapper>
      <Wallet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => css`
    ${PgTheme.convertToCSS(theme.components.tabs.default)};
  `}
`;

const TabsWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  ${PgTheme.getScrollbarCSS({ height: "0.25rem !important" })};
`;


export default Tabs;
