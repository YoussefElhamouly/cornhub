import styles from "../settings.module.scss";
import InputField from "@/components/ui/control/inputField/InputField";
import Button from "@/components/ui/control/button/Button";
import Dropdown from "@/components/ui/control/dropdown/Dropdown";

const VISIBILITY_OPTIONS = [
  { displayName: "Public", value: "public" },
  { displayName: "Private", value: "private" },
];

export default async function GeneralSettingsPage({
  params,
}: {
  params: Promise<{ username: string; project: string }>;
}) {
  const resolvedParams = await params;

  return (
    <div className={styles.settings_section}>
      <h2 className={styles.section_title}>General</h2>

      <div className={styles.settings_form}>
        <div style={{ maxWidth: "448px" }}>
          <InputField
            id="repo-name"
            label="Repository name"
            defaultValue={resolvedParams.project}
          />
          <div style={{ marginTop: "1rem" }}>
            <Button title="Rename" />
          </div>
        </div>

        <div
          style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}
        >
          <InputField
            id="repo-description"
            label="Description"
            defaultValue="A high-performance repository created via Cornhub."
            customStyles={{ width: "100%" }}
          />
          <div style={{ marginTop: "1rem" }}>
            <Button title="Save description" />
          </div>
        </div>

        <div
          style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}
        >
          <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>
            Visibility
          </h4>
          <Dropdown
            options={VISIBILITY_OPTIONS}
            defaultValue="public"
            buttonStyle={{ width: "200px" }}
          />
        </div>
      </div>

      <div className={styles.danger_zone}>
        <div className={styles.danger_header}>
          <h3>Danger Zone</h3>
        </div>

        <div className={styles.danger_item}>
          <div className={styles.danger_info}>
            <h4>Change repository visibility</h4>
            <p>This repository is currently public.</p>
          </div>
          <Button variant="outline" title="Change visibility" />
        </div>

        <div className={styles.danger_item}>
          <div className={styles.danger_info}>
            <h4>Archive this repository</h4>
            <p>Mark this repository as archived and read-only.</p>
          </div>
          <Button variant="outline" title="Archive this repository" />
        </div>

        <div className={styles.danger_item}>
          <div className={styles.danger_info}>
            <h4>Delete this repository</h4>
            <p>
              Once you delete a repository, there is no going back. Please be
              certain.
            </p>
          </div>
          <Button
            variant="ghost"
            title="Delete this repository"
            customStyles={{
              color: "var(--text-accent-red)",
              border: "1px solid var(--text-accent-red)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
