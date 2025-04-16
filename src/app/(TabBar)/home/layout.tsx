const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex h-full justify-center">
      <div className="w-[60%] min-w-[800px] overflow-hidden">{children}</div>
    </div>
  );
};

export default Layout;
