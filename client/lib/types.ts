
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
  };
  topic: {
    title: string
  };
  completed: {
    createdAt: Date
  }[];
  quiz?: {
    id: string,
    quizResults: {
      percent: number
    }[]
  }
}


interface ProgrammeArgs {
  code: string;
  description: string;
  goal: string;
  title: string;
}

// Lesson content
type MarkdownContent = { type: 'markdown'; markdown: string; };

type ListContent = { type: 'list'; list: string[]; };

type ImgContent = { type: 'img'; img: string; };

type QuestionContent = { type: 'question'; questionId: string; };

type CodeContent = { type: 'code'; language: string; code: string; };

// Union of all types
type LessonSlideProps = (MarkdownContent | ListContent | ImgContent | QuestionContent | CodeContent) & { key?: string };

/*{
  type: 'markdown' | 'list' | 'img' | 'question' | 'code';
  language?: string;
  markdown: string;
  list: string[];
  img: string;
  key?: string;
}*/

type LessonSlidesProps = LessonSlideProps[][]

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

  lessonOrQuiz: {
    lesson?: LessonArg,
    quiz?: QuizArgs & { number: number }
  }
}