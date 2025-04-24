import { useState } from "react";
import Image from "next/image";

export type ModelResultType = {
  name: string;
  desc?: string;
  type?: "normal" | "percent";
  items: number[];
  defaultShowSpeedUp?: boolean;
};

export type ModelRowType = {
  modelName: string;
  modelSummary: string[];
  results: ModelResultType[];
};

const ResultItem = ({
  result,
  isLast = false,
}: {
  result: ModelResultType;
  isLast?: boolean;
}) => {
  const { defaultShowSpeedUp = true } = result;
  const [showSpeedUp, setShowSpeedUp] = useState<boolean>(defaultShowSpeedUp);

  return (
    <div
      className={`flex py-4 text-center hover:bg-blue-50 ${isLast ? "" : "border-b border-gray-100"}`}
    >
      <div className="flex flex-1">
        <div className="flex flex-1 justify-start pl-8 text-start">
          {result.name}
        </div>
      </div>
      {result.items.map((item, index) => {
        const speedUp =
          showSpeedUp && index != 0
            ? result.items[index - 1] === 0
              ? item === 0
                ? 0
                : item > 0
                  ? 100
                  : -100
              : Math.round(
                  ((item - result.items[index - 1]) * 10000) /
                    Math.abs(result.items[index - 1]),
                ) / 100
            : undefined;
        return (
          <div key={`i${index}`} className="relative flex flex-1 justify-end">
            {result.type === "percent"
              ? `${Math.round(item * 10000) / 100}%`
              : item}
            {typeof speedUp !== "undefined" && (
              <div
                className={`absolute top-[22] right-0 text-xs ${speedUp > 0 ? "text-blue-500" : speedUp < 0 ? "text-amber-500" : "text-gray-300"} `}
              >
                {`${speedUp}%`}
              </div>
            )}
          </div>
        );
      })}
      <div className="flex flex-1">
        <div className="flex flex-1 items-end justify-center pl-8">
          <div
            className="cursor-pointer"
            onClick={() => setShowSpeedUp(!showSpeedUp)}
          >
            <Image
              src={`/pct_${showSpeedUp ? "1" : "0"}.png`}
              alt={""}
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ListModelResult = ({
  modelName,
  modelSummary,
  results,
}: ModelRowType) => {
  return (
    <div className="flex border-b border-gray-200">
      <div className="flex flex-3 flex-col justify-center">
        {results.map((result, index) => (
          <ResultItem
            key={index}
            result={result}
            isLast={index === results.length - 1}
          />
        ))}
      </div>
      <div className="flex flex-2">
        <div className="flex flex-1 flex-col justify-center gap-2 p-4">
          <div className="text-center text-xl">{modelName}</div>
          {modelSummary.map((row, index) => (
            <div key={index} className="">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{row}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListModelResult;
