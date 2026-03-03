import React from "react";
import Feed from "@/components/features/feed/feed/Feed";
import Filter from "@/components/ui/control/filter/Filter";
import Main from "@/components/layouts/main/Main";
import SearchBar from "@/components/ui/control/searchBar/SearchBar";
const filterOptions = [
  { displayName: "All", value: "all", key: "all", default: true },
  { displayName: "Starred", value: "starred", key: "starred" },
  { displayName: "Issues", value: "issues", key: "issues" },
];

const Posts = () => {
  return (
    <>
      <Main customStyles={{ gap: "1rem" }}>
        <Filter options={filterOptions} id="posts" />
        <SearchBar placeHolder="Search posts..." />

        <Feed />
      </Main>
    </>
  );
};

export default Posts;
