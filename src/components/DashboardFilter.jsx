import TableOperations from "./TableOperations";

const DASHBOARD_FILTER_OPTIONS = [
  {
    label: "last 7 days",
    value: "7",
  },
  {
    label: "last 30 days",
    value: "30",
  },
  {
    label: "last 90 days",
    value: "90",
  },
];

const DashboardFilter = () => {
  return (
    <div>
      <TableOperations fieldName="last" options={DASHBOARD_FILTER_OPTIONS} />
    </div>
  );
};
export default DashboardFilter;
