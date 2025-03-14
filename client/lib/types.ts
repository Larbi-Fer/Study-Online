
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
    wrong: number;
    timeOut: number;
  }
}

interface QuizStatistics {
  label: string;
  correct: string;
  wrong: string;
  timeout: string;
}

type LessonSlidesProps = LessonSlideProps[][]