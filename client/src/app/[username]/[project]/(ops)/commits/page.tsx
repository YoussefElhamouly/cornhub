import CommitsControls from "./_components/CommitsControls";
import CommitsList from "./_components/CommitsList";
import styles from "./_components/commits.module.scss";

export default async function CommitsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  return (
    <div style={{ padding: "1rem" }}>
      <div className={styles.identity_header}>
        <h1 className={styles.title}>Commits</h1>
      </div>
      <CommitsControls searchParams={resolvedSearchParams} />
      <CommitsList />
    </div>
  );
}
