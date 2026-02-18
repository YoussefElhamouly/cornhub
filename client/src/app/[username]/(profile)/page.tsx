import Overview from "./_overview/Overview";
import Repositories from "./_repositories/Repositories";
import Posts from "./_posts/Posts";

const TABS: Record<string, React.ComponentType> = {
  overview: Overview,
  repos: Repositories,
  posts: Posts,
};

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab = "overview" } = await searchParams;
  const TabComponent = TABS[tab] ?? Overview;
  return <TabComponent />;
}
