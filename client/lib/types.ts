
interface LessonArg {
  id: string;
  number: number;
  title: string;
  data: {
    lesson: LessonSlidesProps
  };
  topicId: string;
  programmes: {
    code: string;
    description: string;
    goal: string;
    title: string;
  }[]

  _count: {
    programmes: number
  }
}

interface LessonSlideProps {
  type: 'markdown' | 'list' | 'img' | 'question';
  markdown: string;
  list: string[];
  img: string;
}

type LessonSlidesProps = LessonSlideProps[][]