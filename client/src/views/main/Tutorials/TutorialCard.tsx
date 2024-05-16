import { FC, useMemo } from "react";
import Tag from "../../../components/Tag";
import { PgTutorial, TutorialData } from "../../../utils/pg";

const colors = ["#3C54D2", "#6D30B7", "#DBDBDB"];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const TutorialCard: FC<TutorialData> = ({ name, level, framework }) => {
  const backgroundColor = useMemo(getRandomColor, []); // memoize to keep the same color during re-renders

  return (
    <div
      className="relative transform transition-transform ease-in-out duration-300 hover:translate-y-[-0.75rem] cursor-pointer col-span-1 w-72 h-48"
      onClick={() => PgTutorial.open(name)}
    >
      <div
        className="absolute top-0 right-0 bottom-0 left-0 rounded-lg"
        style={{ backgroundColor }}
      />
      <div className="relative z-10 h-full w-full rounded-lg bg-card-bg shadow-lg overflow-hidden">
        <div className="relative z-20 h-full w-full flex flex-col justify-between p-4">
          <div className="absolute top-3 left-3">
            <Tag kind="level" value={level} />
          </div>

          <div className="absolute top-3 right-3">
            {framework && <Tag kind="framework" value={framework} />}
          </div>
          
          <div className="absolute bottom-3 left-3">
            <div className="flex pr-20 overflow-auto justify-center gap-2 mb-4">
              <span className="font-bold text-lg text-text-primary">{name}</span>
            </div>
            <button className="bg-gray-800 text-white border-none px-4 py-2 rounded hover:bg-gray-700">
              Start Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;
