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
      "label": "conditions"
  },
  {
      "correct": 1,
      "incorrect": 5,
      "timeout": 2,
      "label": "lists"
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
          {getOverallFeedback(result.statistics.general, result.percent)}
        </Grid>
      </Grid>

      <Grid container size={6} className='general-pie'>
        <Grid size={4} className="chart">
          <GeneralResults data={result.statistics.general} />
        </Grid>
        <Grid size={8}>
          <div style={{padding: '5px'}}>✅ Correct: {result.statistics.general[0].value}</div>
          
          <div style={{padding: '5px'}}>❌ Incorrect: {result.statistics.general[1].value}</div>
          
          <div style={{padding: '5px'}}>⏱ Timeout: {result.statistics.general[2].value}</div>
        </Grid>
      </Grid>

      <Grid size={12}>
        <div className="notes">
          <h2>Notes</h2>
          <span></span>
          <WeakTopicsWithFeedback accuracy={result.percent} data={result.statistics.byField} />
        </div>
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

function getOverallFeedback(data: QuizGeneralResults[], accuracy: number): string {
  const correct = data.find(d => d.label === 'correct')?.value || 0;
  const incorrect = data.find(d => d.label === 'incorrect')?.value || 0;
  const timeout = data.find(d => d.label === 'timeout')?.value || 0;

  const total = correct + incorrect + timeout;
  let message = '';

  // Summary message
  const summary = `You answered ${correct} out of ${total} questions correctly.`;

  // Feedback messages
  if (accuracy >= 80) {
    message = "🎉 Excellent job! You're mastering this topic."
  } else if (accuracy >= 60) {
    message = "👍 Good work, but there's still room for improvement."
  } else {
    message = "📚 You need more practice. Don’t give up!"
  }

  return message + '\n' + summary
}



function WeakTopicsWithFeedback({data, accuracy}: {data: QuizStatistics[], accuracy: number}): React.ReactNode {
  const msg = data
    .map((topic) => {
      const { correct, incorrect, timeout, label } = topic;

      const messages: string[] = [];

      if (accuracy < 50) {
        messages.push(
          `Your accuracy in "${label}" was quite low (${accuracy}%). Aim for at least 70%.`
        );
      }

      if (incorrect > correct) {
        messages.push(
          `You had more incorrect answers than correct ones in "${label}". Consider reviewing the core concepts.`
        );
      }

      if (timeout > 0) {
        messages.push(
          `You ran out of time on ${timeout} question(s) in "${label}". Practice under timed conditions may help.`
        );
      }

      return {
        messages
      };
    })
    .filter((entry) => entry.messages.length > 0)

    if (msg.length == 0) return <div style={{textAlign: 'center', color: '#aaa'}}>Excellent, no notes for you</div>

    return msg.map((m, i) => (<div key={i} style={{paddingBottom: '5px'}}>{m.messages.map(((m1, j) => (<div key={i + '-' + j}>{m1}</div>)))}</div>))
}


export default QuizCharts