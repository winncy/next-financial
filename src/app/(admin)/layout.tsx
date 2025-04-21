import { ReactNode } from "react";
import TabBar from "@/component/TabBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <header className="z-20 h-14 shadow-lg">
        <TabBar />
      </header>
      <div className="min-h-0 min-w-0 flex-1 overflow-hidden bg-gradient-to-b from-blue-50 to-60%">
        {children}
      </div>
    </div>
  );
};

export default Layout;
