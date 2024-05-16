import { FC } from "react";
import Link from "../Link";
import Tag from "../Tag";
import { Arrayable, TutorialDetailKey } from "../../utils/pg";
import { useDifferentBackground } from "../../hooks";

interface TutorialDetailsProps {
  details: ClickableTutorialDetailProps[];
}

const TutorialDetails: FC<TutorialDetailsProps> = ({ details }) => {
  const { ref } = useDifferentBackground();

  return (
    <div
      ref={ref}
      className="p-4 flex flex-wrap justify-between gap-x-8 gap-y-4 rounded-md"
    >
      {details.map(({ kind, data }) => {
        return (
          data && (
            <div key={kind} className="flex flex-col gap-2">
              <span className="font-bold uppercase tracking-wide text-sm">
                {kind}
              </span>

              <div className="flex flex-wrap gap-4">
                {Array.isArray(data) ? (
                  data.map((data) => (
                    <ClickableTutorialDetail
                      key={data}
                      kind={kind}
                      data={data}
                    />
                  ))
                ) : (
                  <ClickableTutorialDetail kind={kind} data={data} />
                )}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

interface ClickableTutorialDetailProps {
  kind: TutorialDetailKey;
  data: Arrayable<string> | undefined;
}

const ClickableTutorialDetail: FC<ClickableTutorialDetailProps> = ({
  data,
  ...props
}) => (
  <Link href={`/tutorials?${props.kind}=${data}`}>
    <Tag {...props} value={data} />
  </Link>
);

export default TutorialDetails;
