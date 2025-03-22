import CodeSnippet from "./CodeContainer"
import List from "./List"
import Markdown from "./Markdown"

const LessonContant = ({ content }: { content: LessonSlideProps }) => {
  switch (content.type) {
    case 'markdown':
      return <Markdown>{content.markdown}</Markdown>
    case 'list':
      return <List items={content.list} />
    // case 'img':
    //   return <Img src={content.img} />
    // case 'question':
    //   return <Question questionId={content.questionId} />
    case 'code':
      return <CodeSnippet language={content.language} code={content.code} />
    default:
      return null
  }
}

export default LessonContant