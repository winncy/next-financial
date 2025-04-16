export type SuggestBoxProps = {
  title: string;
  description: string[];
};

const SuggestBox = ({ title, description }: SuggestBoxProps) => {
  return (
    <div className="flex h-fit w-fit min-w-0 cursor-pointer flex-col gap-2 rounded-lg border border-gray-100 bg-white px-8 py-4 text-[#112D4E]/60 shadow select-none hover:border-blue-100 hover:bg-blue-100 hover:text-[#112D4E]">
      <div className="text-lg text-[#112D4E]">{title}</div>
      <div className="flex flex-col gap-1 text-xs">
        {description.map((desc, index) => (
          <li key={title + index}>{desc}</li>
        ))}
      </div>
    </div>
  );
};

export default SuggestBox;
