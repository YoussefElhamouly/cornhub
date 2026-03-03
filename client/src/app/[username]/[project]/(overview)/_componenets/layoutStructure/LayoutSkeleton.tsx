import Skeleton from "@/components/ui/feedback/skeleton/Skeleton";
import styles from "../../project.module.scss";
import Icon from "@/components/ui/media/icon/Icon";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
import Main from "@/components/layouts/main/Main";
import Aside from "@/components/layouts/aside/Aside";

export default function SkeletonLoader() {
  const ProjectHeaderSkeleton = () => (
    <div className={styles.project_header}>
      <div className={styles.header_left}>
        <Skeleton
          customStyles={{ width: "32px", height: "32px", borderRadius: "50%" }}
        />
        <Skeleton customStyles={{ width: "100px", height: "20px" }} />

        <div className={styles.project_info_text}>
          <Skeleton customStyles={{ width: "70px", height: "15px" }} />
        </div>
      </div>

      <div className={styles.header_right}>
        <Skeleton customStyles={{ width: "100px", height: "32px" }} />
        <Skeleton customStyles={{ width: "100px", height: "32px" }} />
        <Skeleton customStyles={{ width: "100px", height: "32px" }} />
        <Skeleton customStyles={{ width: "100px", height: "32px" }} />
        <Skeleton customStyles={{ width: "100px", height: "32px" }} />
      </div>
    </div>
  );

  const AboutSectionSkeleton = () => (
    <div className={styles.about_section}>
      <div className={styles.about_content}>
        <div className={styles.section_header}>
          {/*about*/}
          <Skeleton customStyles={{ width: "60px", height: "15px" }} />

          <Skeleton customStyles={{ width: "20px", height: "20px" }} />
        </div>
        <Skeleton customStyles={{ width: "70%", height: "10px" }} />
        <div className={styles.stat_item}>
          <Icon icon={"BookOpen"} size={"16"} />
          <Skeleton customStyles={{ width: "100px", height: "5px" }} />
        </div>
        <div className={styles.stat_item}>
          <Icon icon={"Activity"} size={"16"} />
          <Skeleton customStyles={{ width: "100px", height: "5px" }} />
        </div>
        <div className={styles.stat_item}>
          <Icon size={"16"} icon={"Star"} />
          <span className={styles.stat_value}>
            <Skeleton customStyles={{ width: "100px", height: "5px" }} />
          </span>
        </div>
        <div className={styles.stat_item}>
          <Icon size={"16"} icon={"Eye"} />
          <span className={styles.stat_value}>
            <Skeleton customStyles={{ width: "100px", height: "5px" }} />
          </span>
        </div>
        <div className={styles.stat_item}>
          <Icon size={"16"} icon={"ForkKnifeCrossed"} />
          <span className={styles.stat_value}>
            <Skeleton customStyles={{ width: "100px", height: "5px" }} />
          </span>
        </div>
        <div className={styles.stat_item}>
          <Icon size={"16"} icon={"Webhook"} />
          <span className={styles.stat_value}>
            <Skeleton customStyles={{ width: "100px", height: "5px" }} />
          </span>
        </div>
      </div>
    </div>
  );

  const LanguagesSectionSkeleton = () => (
    <div className={styles.languages_section}>
      {/*lang*/}
      <Skeleton customStyles={{ width: "60px", height: "15px" }} />
      <div className={styles.languages_content}>
        <div className={styles.language_bar_container}>
          <Skeleton
            customStyles={{
              width: "30%",
              height: "100%",
              backgroundColor: "#f1e05a",
              borderRadius: "0",
            }}
          />
          <Skeleton
            customStyles={{
              width: "25%",
              height: "100%",
              backgroundColor: "#2b7489",
              borderRadius: "0",
            }}
          />
          <Skeleton
            customStyles={{
              width: "20%",
              height: "100%",
              backgroundColor: "#c6538c",
              borderRadius: "0",
            }}
          />
          <Skeleton
            customStyles={{
              width: "25%",
              height: "100%",
              backgroundColor: "#858585",
              borderRadius: "0",
            }}
          />
        </div>
        <div className={styles.language_bars}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={styles.language_bar_item}>
              <div className={styles.language_bar_label}>
                <Skeleton
                  customStyles={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor:
                      i === 0
                        ? "#f1e05a"
                        : i === 1
                          ? "#2b7489"
                          : i === 2
                            ? "#c6538c"
                            : "#858585",
                  }}
                />
                <Skeleton
                  customStyles={{
                    width: "60px",
                    height: "14px",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <Skeleton
                customStyles={{
                  width: "30px",
                  height: "14px",
                  borderRadius: "4px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Wrapper className={styles.project_page}>
      <ProjectHeaderSkeleton />
      <Wrapper className={styles.project_content_wrapper}>
        <Main className={styles.project_main}>
          <Skeleton customStyles={{ width: "100%", height: "240px" }} />
          <Skeleton customStyles={{ width: "100%", height: "320px" }} />
          <Skeleton customStyles={{ width: "100%", height: "120px" }} />
        </Main>
        <Aside className={styles.project_aside}>
          <AboutSectionSkeleton />
          <LanguagesSectionSkeleton />
        </Aside>
      </Wrapper>
    </Wrapper>
  );
}
