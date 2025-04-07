
type Topic = {
  id: string;
  title: string;
};

const TopicsList = ({topics}: {topics: Topic[]}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-bold">{topic.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default TopicsList