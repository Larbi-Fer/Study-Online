'use client'
import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ['#8dfa92', '#ff7474', '#f8cd70'];

const GeneralResults = ({ data }: { data: QuizGeneralResults[] }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true); // This ensures client-side rendering logic only runs after hydration.
  }, []);

  if (!isClient) return 'Loading ...'

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={40} height={40}>
        <Pie
          data={data}
          cx={80}
          cy={80}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          nameKey='label'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        {/* <Legend /> */}
      </PieChart>
    </ResponsiveContainer>
  )
}

export default GeneralResults