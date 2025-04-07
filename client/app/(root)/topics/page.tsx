import { getTopics } from "@/actions/topics.actions";
import TopicsList from "@/components/Topics/TopicsList";

const TopicsPage = async () => {

  const topics = await getTopics();

  return (
    <TopicsList topics={topics.payload} />
  );
};

export default TopicsPage;