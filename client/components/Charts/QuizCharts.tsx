'use client'

import Grid from "@mui/material/Grid2"
import GeneralResults from "./GeneralResults"
import ResultsByFields from "./ResultsByFields"
import Rate from "./Rate"
import "./style.css"
import FieldsPercentage from "./FieldsPercentage"

const data2: QuizGeneralResults[] = [{
  label: 'correct',
  value: 7
},{
  label: 'incorrect',
  value: 3
},{
  label: 'timeout',
  value: 1
}]

const data = [
  {
      "correct": 4,
      "incorrect": 2,
      "timeout": 0,
      "label": "variables"
  },
  {
      "correct": 4,
      "incorrect": 1,
      "timeout": 0,
      "label": "terminal"
  },
  {
      "correct": 1,
      "incorrect": 5,
      "timeout": 2,
      "label": "general"
  },
  {
      "correct": 4,
      "incorrect": 1,
      "timeout": 0,
      "label": "terminal2"
  },
  {
      "correct": 1,
      "incorrect": 5,
      "timeout": 2,
      "label": "general2"
  }
]

type QuizChartsProps = {
  result: QuizStatisticsArgs
}

const QuizCharts = ({ result }: QuizChartsProps) => {
  console.log(result);
  
  return (
    <Grid container spacing={5} className="charts-container">
      <Grid container size={6} className={'card rate' + (result.percent < 50 ? ' red-card' : (result.percent < 80 ? ' blue-card' : ' green-card'))}>
        <Grid size={4}>
          <Rate percent={result.percent} />
        </Grid>
        <Grid size={8}>
          info
        </Grid>
      </Grid>

      <Grid container size={6} className='general-pie'>
        <Grid size={4} className="chart">
          <GeneralResults data={result.statistics.general} />
        </Grid>
        <Grid size={4}>
          info
        </Grid>
      </Grid>

      <Grid size={6} container className='bar-chart'>
          <ResultsByFields data={result.statistics.byField} />
      </Grid>

      <Grid size={6}>
          <FieldsPercentage data={result.statistics.byField} />

      </Grid>
    </Grid>
  )
}

export default QuizCharts