import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ReviewsPerDay } from "../../../hooks/useStatistics";

export const Chart = ({ data }: { data: ReviewsPerDay[] }) => {
  return (
    <div>
      <h2 className="text-[24px] md:text-[32px] font-semibold text-black mb-8">
        Revisões por dia
      </h2>
      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          className="ml-[-44px]"
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="created_at" />
          <YAxis />
          <Tooltip />
          <Bar
            name="Revisões"
            dataKey="reviews"
            fill="#000000"
            activeBar={<Rectangle fill="#0f0f0f" stroke="black" />}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
