const EnterpriseSummary = ({ name }: { name: string }) => {
  return (
    <iframe
      src={`/combine/${name}.html`}
      style={{ width: "100%", height: "100%", minHeight: "600px" }}
      frameBorder="0"
    ></iframe>
  );
};

export default EnterpriseSummary;
