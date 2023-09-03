import DashboardFilter from "./DashboardFilter";

const DashboardDetails = () => {
  return (
    <div className="flex flex-col items-start gap-4 md:items-center md:justify-between md:flex-row">
      <h1 className="text-2xl md:text-4xl tracking-wide font-semibold dark:text-white">
        Dashboard
      </h1>
      <DashboardFilter />
    </div>
  );
};

export default DashboardDetails;
