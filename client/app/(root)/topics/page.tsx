import { getTopics } from "@/actions/topics.actions";
import TopicsList from "@/components/Topics/TopicsList";
import { getUserData } from "@/lib/serverUtils";

export const metadata = {
  title: 'Topics',
}

const TopicsPage = async () => {
  const topics = await getTopics();

  const user = await getUserData()

  return (
    <TopicsList topics={topics.payload} isAdmin={user?.role == 'admin'} />
  );
};

export default TopicsPage;