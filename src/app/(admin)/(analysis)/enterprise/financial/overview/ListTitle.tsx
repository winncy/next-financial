import { ReactNode } from "react";

type ListRowProps = {
  titles: ReactNode[];
  summary: ReactNode;
};

const ListTitle = ({ titles, summary }: ListRowProps) => {
  return (
    <div className="flex border-b border-gray-200">
      <div className={"flex flex-3 py-2 text-lg text-blue-500"}>
        {titles.map((title, index) => (
          <div key={`t${index}`} className="flex-1 text-end">
            {title}
          </div>
        ))}
      </div>
      <div className="flex-2 py-2">{summary}</div>
    </div>
  );
};

export default ListTitle;
