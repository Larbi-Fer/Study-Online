import { BarChart } from '@mui/x-charts/BarChart';
import { ResponsiveContainer } from 'recharts';

const COLORS = ['#50ff58', '#ff6767', '#FF9800'];

const ResultsByFields = ({ data }: {data: QuizStatistics[]}) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        width={700}
        height={400}
        series={[
          { valueFormatter: v => addS('answer', 'answers', v!), data: data.map(d => d.correct), label: 'correct', id: 'correctBar', stack: 'total', color: COLORS[0] },
          { valueFormatter: v => addS('answer', 'answers', v!), data: data.map(d => d.incorrect), label: 'incorrect', id: 'incorrectBar', stack: 'total', color: COLORS[1] },
          { valueFormatter: v => addS('answer', 'answers', v!), data: data.map(d => d.timeout), label: 'timeout', id: 'timeoutBar', stack: 'total', color: COLORS[2] },
        ]}
        onAxisClick={(e, b) => console.log(b)}
        borderRadius={6}
        xAxis={[{ data: data.map(d => d.label), scaleType: 'band' }]}
      />
    </ResponsiveContainer>
  )
}

const addS = (v: string, pv: string, n: number) => n + ' ' + (n > 1 ? pv : v)

/*
<ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="correct" stackId="a" fill={COLORS[0]} radius={[0, 0, 10, 10]} />
        <Bar dataKey="wrong" stackId="a" fill={COLORS[1]} />
        <Bar dataKey="timeOut" stackId="a" fill={COLORS[2]} radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
*/

export default ResultsByFields