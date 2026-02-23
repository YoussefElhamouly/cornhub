import { redirect } from "next/navigation";

export default async function WorkItemPage({
  params,
}: {
  params: Promise<{
    username: string;
    project: string;
    type: string;
    id: string;
  }>;
}) {
  const { username, project, type, id } = await params;
  redirect(`/${username}/${project}/${type}/${id}/conversation`);
}
