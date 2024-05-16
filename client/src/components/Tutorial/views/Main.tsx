import { FC, useEffect, useRef } from "react";
import Split from "react-split";

import Button from "../../Button";
import Markdown from "../../Markdown";
import { EditorWithTabs } from "../../../views/main/EditorWithTabs";
import { PointedArrow } from "../../Icons";
import { PgTutorial } from "../../../utils/pg";
import type { TutorialMainComponentProps } from "../types";

export const Main: FC<TutorialMainComponentProps> = ({
  pages,
  layout = "editor-content",
  onComplete,
}) => {
  const pageNumber = PgTutorial.pageNumber;

  const tutorialPageRef = useRef<HTMLDivElement>(null);

  // Scroll to the top on page change
  useEffect(() => {
    tutorialPageRef.current?.scrollTo({ top: 0, left: 0 });
  }, [pageNumber]);

  // Specific page events
  useEffect(() => {
    if (!pageNumber) return;

    const page = pages[pageNumber - 1];
    if (page.onMount) return page.onMount();
  }, [pageNumber, pages]);

  const nextPage = () => {
    PgTutorial.pageNumber! += 1;
  };

  const previousPage = () => {
    PgTutorial.pageNumber! -= 1;
  };

  const finishTutorial = () => {
    PgTutorial.finish();
    if (onComplete) onComplete();
  };

  if (!pageNumber) return null;

  const currentPage = pages.at(pageNumber - 1);
  if (!currentPage) {
    // This could happen if the saved page has been deleted
    PgTutorial.pageNumber = 1;
    return null;
  }

  const currentContent = currentPage.content;
  const currentLayout = currentPage.layout ?? layout;

  const Wrapper = currentLayout === "content-only" ? "div" : Split;

  return (
    <Wrapper
      {...(currentLayout !== "content-only" ? { sizes: [40, 60] } : {})}
      className="flex w-full h-full pt-12 overflow-hidden"
    >
      <div
        ref={tutorialPageRef}
        className="overflow-auto h-full"
      >
        <div className="bg-black">
          <div className="p-6">
            {typeof currentContent === "string" ? (
              <Markdown>{currentContent}</Markdown>
            ) : (
              currentContent
            )}
          </div>
          <div className="py-12">
            <div className="flex w-full pt-6 border-t border-gray-700 text-sm font-bold">
              {pageNumber !== 1 && (
                <div className="w-full">
                  <div>Previous</div>
                  <Button
                    onClick={previousPage}
                    kind="no-border"
                    className="mt-2 text-base font-bold"
                    leftIcon={<PointedArrow rotate="180deg" />}
                  >
                    {pages[pageNumber - 2].title ??
                      `${pageNumber - 1}/${pages.length}`}
                  </Button>
                </div>
              )}
              <div className="flex flex-col items-end w-full">
                <div>Next</div>
                {pageNumber === pages.length ? (
                  <Button
                    onClick={finishTutorial}
                    kind="no-border"
                    color="success"
                    className="mt-2 text-base font-bold"
                    rightIcon={<span>✔</span>}
                  >
                    Finish
                  </Button>
                ) : (
                  <Button
                    onClick={nextPage}
                    kind="no-border"
                    className="mt-2 text-base font-bold"
                    rightIcon={<PointedArrow />}
                  >
                    {pages[pageNumber].title ??
                      `${pageNumber + 1}/${pages.length}`}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {currentLayout === "editor-content" && <EditorWithTabs />}
    </Wrapper>
  );
};
