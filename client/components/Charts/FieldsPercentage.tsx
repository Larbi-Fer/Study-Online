import { BarChart } from "@mui/x-charts"
import { ResponsiveContainer } from "recharts"

const FieldsPercentage = ({ data }: {data: QuizStatistics[]}) => {
  let sum = 0
  for (let i = 0; i < data.length; i++) { sum += data[i].correct }

  const sortedData = [...data].sort((a, b) => b.correct - a.correct);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        width={700}
        height={400}
        series={[
          {
            valueFormatter: (v) => v + '%',
            data: sortedData.map(field => Math.round(field.correct / sum * 100)),
            label: 'correct answers',
            id: 'correctBar',
            stack: 'total'
          },
        ]}
        borderRadius={6}
        xAxis={[{ data: sortedData.map(d => d.label), scaleType: 'band' }]}
        yAxis={[{valueFormatter: value => value + '%',}]}
      />
    </ResponsiveContainer>
  )
}

export default FieldsPercentage