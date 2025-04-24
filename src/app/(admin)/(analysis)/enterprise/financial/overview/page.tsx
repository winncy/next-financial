"use client";

import PdfViewer from "@/component/PdfViewer";
import { useEffect } from "react";
import { useDebounceFn } from "ahooks";

const Page = () => {
  const { run: handleSelection } = useDebounceFn(
    () => {
      const text = window.getSelection()?.toString();
      if (text) {
        console.log("Selected text:", text);
      }
    },
    {
      wait: 1000,
    },
  );

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelection);
    return () => {
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, [handleSelection]);

  return (
    <div className="flex h-full justify-center border border-red-500">
      <div className="h-full w-[80%] overflow-y-auto">
        {/*<PdfViewer url={"/20250418.pdf"} />*/}
      </div>
    </div>
  );
};

export default Page;
