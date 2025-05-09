"use client";

import SideBar from "@/component/SideBar";
import React, { PropsWithChildren, useState } from "react";
import Image from "next/image";

const Layout = ({ children }: PropsWithChildren) => {
  const [showSideBar, setShowSideBar] = useState(true);

  const handleShowOrHideSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <div className="flex h-full">
      <div
        className={`overflow-hidden bg-white px-2 py-4 ${showSideBar ? "w-fit" : "w-4"}`}
      >
        {showSideBar && <SideBar />}
      </div>
      <div className="relative w-0 border-[0.5] border-gray-100">
        <div
          className="absolute right-[-12] bottom-32 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white"
          onClick={handleShowOrHideSidebar}
        >
          <Image
            alt={""}
            src={"/arrow-left-double-line.png"}
            width={16}
            height={16}
            className={showSideBar ? "" : "rotate-180"}
          />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white p-4 pt-8">
        {children}
      </div>
      {/*<FloatButton*/}
      {/*  icon={<RobotOutlined />}*/}
      {/*  onClick={() => console.log("onClick")}*/}
      {/*/>*/}
    </div>
  );
};

export default Layout;
