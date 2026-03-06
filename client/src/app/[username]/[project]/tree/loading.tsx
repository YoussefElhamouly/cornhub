import React from "react";
import Skeleton from "@/components/ui/feedback/skeleton/Skeleton";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
import Main from "@/components/layouts/main/Main";
import Aside from "@/components/layouts/aside/Aside";
import fileExplorerStyles from "@/components/features/fileExplorer/fileExplorer.module.scss";
import ContentViewer from "@/components/ui/layout/contentViewer/ContentViewer";
const LoadingFileExplorer = () => {
  return (
    <Wrapper>
      <Aside>
        <Skeleton
          customStyles={{
            width: "100px",
            height: "36px",
            borderRadius: "6px",
            marginRight: "auto",
          }}
        />
        {Array(6)
          .fill(0)
          .map((i) => (
            <Skeleton
              key={i}
              customStyles={{
                width: "100%",
                height: "36px",
                borderRadius: "6px",
              }}
            />
          ))}
      </Aside>
      <Main>
        <header
          className={fileExplorerStyles.explorer_content_nav}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {/* Breadcrumb Mock */}
          <Skeleton
            customStyles={{
              width: "200px",
              height: "24px",
              borderRadius: "4px",
            }}
          />

          <Skeleton
            customStyles={{
              width: "32px",
              height: "32px",
              borderRadius: "6px",
              marginLeft: "auto",
            }}
          />
        </header>
        <ContentViewer>
          <ContentViewer.Header>
            <Skeleton
              customStyles={{
                width: "20%",
                height: "40px",
                borderRadius: "6px",
              }}
            />
          </ContentViewer.Header>
          <ContentViewer.Body>
            <Skeleton
              customStyles={{
                width: "100%",
                height: "100%",
                borderRadius: "6px",
              }}
            />
          </ContentViewer.Body>
        </ContentViewer>
      </Main>
    </Wrapper>
  );
};

export default LoadingFileExplorer;
