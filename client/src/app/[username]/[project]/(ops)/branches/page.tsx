import React from "react";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
import Main from "@/components/layouts/main/Main";
import BranchControls from "./_components/controls/BranchControls";
import BranchList from "./_components/lists/BranchList";
import styles from "./_components/branches.module.scss";

interface BranchesProps {
  params: {
    username: string;
    project: string;
  };
}

const Branches = async ({
  params,
  searchParams,
}: {
  params: Promise<{ username: string; project: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  return (
    <Wrapper className={styles.branches_wrapper}>
      <Main className={styles.branches_main}>
        <div className={styles.identity_header}>
          <h1 className={styles.title}>Branches</h1>
        </div>
        <BranchControls />
        <BranchList />
      </Main>
    </Wrapper>
  );
};

export default Branches;
