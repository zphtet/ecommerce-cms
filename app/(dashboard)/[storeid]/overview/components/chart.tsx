"use client";
import { Order } from "@prisma/client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
const data = [
  {
    name: "Jan",
    sale: 0,
  },
  {
    name: "Feb",
    sale: 0,
  },
  {
    name: "Mar",
    sale: 0,
  },
  {
    name: "April",
    sale: 0,
  },
  {
    name: "May",
    sale: 0,
  },
  {
    name: "June",
    sale: 0,
  },
  {
    name: "Jan",
    sale: 0,
  },
  {
    name: "July",
    sale: 0,
  },
  {
    name: "August",
    sale: 0,
  },
  {
    name: "Sep",
    sale: 0,
  },
  {
    name: "Oct",
    sale: 0,
  },
  {
    name: "Nov",
    sale: 0,
  },
  {
    name: "Dec",
    sale: 0,
  },
];

const OverviewChart = ({ orders }: { orders: Order[] }) => {
  const resetData = data.map((month) => {
    return {
      ...month,
      sale: 0,
    };
  });
  orders.forEach((order) => {
    const idx = order.createdAt.getMonth();
    const currPrice = !order.price ? 0 : Number(order.price) / 100;
    resetData[idx].sale += currPrice;
  });
  console.log(resetData);
  return (
    <div className="my-5">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={resetData}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey="sale" barSize={40} fill="#000" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;
