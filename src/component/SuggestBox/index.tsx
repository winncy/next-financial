import { useRouter } from "next/navigation";

export type SuggestBoxProps = {
  title: string;
  description: string[];
  url: string;
};

const SuggestBox = ({ title, description, url }: SuggestBoxProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (url) {
      router.replace(url);
    }
  };

  return (
    <div
      className="flex h-fit w-fit max-w-[320px] min-w-0 cursor-pointer flex-col gap-2 rounded-lg border border-gray-100 bg-white px-8 py-4 text-[#112D4E]/60 shadow select-none hover:border-blue-100 hover:bg-blue-100 hover:text-[#112D4E]"
      onClick={handleClick}
    >
      <div className="text-lg text-[#112D4E]">{title}</div>
      <div className="flex flex-col gap-2 text-xs">
        {description.map((desc, index) => (
          <li key={title + index}>{desc}</li>
        ))}
      </div>
    </div>
  );
};

export default SuggestBox;
