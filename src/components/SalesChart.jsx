import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useThemeProvider } from "../hooks/useThemeProvider";

const SalesChart = ({ data }) => {
  const { theme } = useThemeProvider();

  const colors =
    theme === "dark"
      ? {
          totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
          extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
          text: "#e5e7eb",
          background: "#18212f",
        }
      : {
          totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
          extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
          text: "#374151",
          background: "#fff",
        };

  return (
    <div className="mt-12 bg-white px-4 py-5 rounded-xl">
      <h2 className="text-2xl font-semibold">Sales</h2>
      <div>
        <ResponsiveContainer height={300} width="100%">
          <AreaChart data={data}>
            <XAxis
              dataKey="label"
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <YAxis
              unit="$"
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <CartesianGrid strokeDasharray="4" />
            <Tooltip contentStyle={{ backgroundColor: colors.background }} />
            <Area
              dataKey="sales"
              type="monotone"
              stroke={colors.totalSales.stroke}
              fill={colors.totalSales.fill}
              strokeWidth={2}
              name="Total sales"
              unit="$"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default SalesChart;
