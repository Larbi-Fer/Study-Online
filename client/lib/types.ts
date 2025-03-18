
interface LessonArg {
  id: string;
  number: number;
  title: string;
  data: {
    lesson: LessonSlidesProps
  };
  topicId: string;
  programmes: ProgrammeArgs[]

  _count: {
    programmes: number,
  }
  quiz?: {
    id: string
  }
}

type LessonSlidesProps = LessonSlideProps[][]

interface ProgrammeArgs {
  code: string;
  description: string;
  goal: string;
  title: string;
}

interface LessonSlideProps {
  type: 'markdown' | 'list' | 'img' | 'question';
  markdown: string;
  list: string[];
  img: string;
  key?: string;
}

interface QuizArgs {
  id: string;
  questions: {
    id: string;
    question: string;
    choices: string[];
    correct: number;
    tags: string[];
    time?: number;
  }[]
}

interface userQuizStatistics {
  [tag: string]: {
    correct: number;
    incorrect: number;
    timeout: number;
  }
}

interface QuizStatistics {
  label: string;
  correct: number;
  incorrect: number;
  timeout: number;
}

interface QuizGeneralResults {
  label: 'correct' | 'incorrect' | 'timeout';
  value: number;
}

interface QuizStatisticsArgs {
  statistics: {
    byField: QuizStatistics[];
    general: QuizGeneralResults[];
  }
  percent: number
}

// chellenges

interface ChallengesArgs {
  id: string;
  title: string;
  points: number;
  requiredLvl: number;
}

// dashboard

interface DashboardArgs {
  challenges: ChallengesArgs[];
  points: number;
  lessonsC: number;
  lessonsN: number;
}