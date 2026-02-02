import React, { useState } from "react";
import Feed from "../../../components/features/feed/feed/Feed";
import Filter from "../../../components/ui/filter/Filter";
import Main from "../../../components/layouts/main/Main";
import SearchBar from "../../../components/ui/searchBar/SearchBar";
const filterOptions = [
  { displayName: "All", value: "all", key: "all", default: true },
  { displayName: "Starred", value: "starred", key: "starred" },
  { displayName: "Issues", value: "issues", key: "issues" },
];

const Posts = () => {
  const [selected, setSelected] = useState("all");
  return (
    <>
      <Main customStyles={{ gap: "1rem" }}>
        <Filter
          options={filterOptions}
          id="posts"
          onCheck={(e) => setSelected(e.target.value)}
        />
        <SearchBar placeHolder="Search posts..." />

        <Feed filter={selected} />
      </Main>
    </>
  );
};

export default Posts;
