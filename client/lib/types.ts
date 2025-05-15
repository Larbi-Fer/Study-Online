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
      percent: number;
    }[]
    lastAttempt?: Date;
    locked?: boolean;
    unlockTime?: Date;
  }
}

interface UserProps {
  id?: string;
  fullname?: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
  lesson?: {
    topicId: string;
    number: number;
  }
  lessonId?: string;
  level: number;
  icon: ImageArgs;
  topicEnrollments: TopicEnrollment[];
  selectedTopic?: {
    id: string;
    color: string;
    currentLesson: CurrentLessonProps
    level: number;
  };
}

type UserRole = 'student' | 'admin' | 'code_reviewer'
interface ImageArgs {
  id: string
  path: string
}

interface CurrentLessonProps {
  id: string;
  number: number;
}

interface ProgrammeArgs {
  code: string;
  description: string;
  goal: string;
  title: string;
}

// Lesson content
type LessonContentType = 'markdown' | 'list' | 'img' | 'question' | 'code'

type MarkdownContent = { type: 'markdown'; markdown: string; };

type ListContent = { type: 'list'; list: string[]; };

type ImgContent = { type: 'img'; img: string; };

type QuestionContent = { type: 'question'; questionId: string; };

type CodeContent = { type: 'code'; language: string; code: string; };

// Union of all types
type LessonSlideProps = (MarkdownContent | ListContent | ImgContent | QuestionContent | CodeContent) & { key?: string };
type LessonSlideAndIdProps = LessonSlideProps & {id: number}

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
  type: 'finalQuiz' | 'miniQuiz'
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
    lesson?: LessonArg;
    quiz?: QuizArgs & { number: number };
    quizLocked?: boolean;
    unlockTime?: Date;
  };
  streaks: { createdAt: Date }[];
  topicEnrollments: TopicEnrollment[];
}

type TopicType = 'required' | 'optional'
interface TopicEnrollment {
  topic: {
    id: string;
    title: string;
    type: TopicType;
    color: string;
    icon: ImageArgs
  };
  currentLesson: CurrentLessonProps
  level: number;
  completed: boolean;
}

type ProgrammeTypes = 'challenge' | 'lesson'

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: ImageArgs;
  image: ImageArgs;
  color: string;
  type: TopicType
  dependencies?: {
    id: string
    title: string
  }[] | Topic[]
};

interface CodeReviewArgs {
  id: string
  subject: string
  explication: string
  reviewerId: string | null
  comments: Array<{ sender: 'student' | 'reviewer', message: string }>
  createdAt: Date
}

interface DiscussionArgs {
  id: string
  title: string
  content: string
  tags: string[]
  userId: string
  user: {
    id: string
    fullname: string
    email: string,
    icon?: ImageArgs
  }
  _count: {
    comments: number
    votes: number
  }
  votes: {
    userId: string
  }[]
  createdAt: Date
}

interface DiscussionDetailsArgs extends DiscussionArgs {
  comments: CommentArgs[]
  createdAt: Date
  isUpdated: boolean
}

interface CommentArgs {
  id: string
  content: string
  userId: string
  user: {
    id: string
    fullname: string
    icon: ImageArgs
  }
  createdAt: Date
}[]

interface ProfileArgs {
  fullname: string
  email: string
  icon: ImageArgs
  level: number
  role: UserRole
  topicEnrollments: {
    topic: {
      title: string
      icon: ImageArgs
    }
  }[]
  discussions: DiscussionArgs[]
}

interface NotificationProps {
  id: string
  userId: string
  content: string
  link: string
  type: string
  isSeen: boolean
  time: Date
}