import React from "react";
import styles from "./projectLink.module.scss";
import { Link } from "react-router-dom";
import { renderNumberWithAbbreviations } from "../../../utils/helperFunctions";
import { AudioLines, Star } from "lucide-react";
import Icon from "../icon/Icon";
// Language color mapping (GitHub-style colors)
const getLanguageColor = (language) => {
  const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#239120",
    PHP: "#4F5D95",
    Ruby: "#701516",
    Go: "#00ADD8",
    Rust: "#dea584",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
    HTML: "#e34c26",
    CSS: "#563d7c",
    SCSS: "#c6538c",
    Vue: "#4fc08d",
    React: "#61dafb",
    Angular: "#dd0031",
    Shell: "#89e051",
    Dockerfile: "#384d54",
    YAML: "#cb171e",
    JSON: "#292929",
    Markdown: "#083fa1",
    SQL: "#e38c00",
    R: "#198CE7",
    Dart: "#00B4AB",
    Lua: "#000080",
    Perl: "#0298c3",
    Scala: "#c22d40",
    Clojure: "#db5855",
    Haskell: "#5e5086",
    Elixir: "#6e4a7e",
    Erlang: "#a90533",
    OCaml: "#3be133",
    FSharp: "#b845fc",
    PowerShell: "#012456",
    Vim: "#199f4b",
    Assembly: "#6E4C13",

    "Objective-C++": "#6866fb",
    Racket: "#3c5caa",
    TeX: "#3D6117",
    MATLAB: "#e16737",
    Groovy: "#4298b8",
    Solidity: "#AA6746",
    Default: "#f1e05a",
  };

  // Default to JavaScript yellow if language not found
  return languageColors[language] || languageColors.Default;
};

const ProjectCard = ({
  name,
  description,
  visibility = "Public",
  language = "JavaScript",
  stars = 0,
  icon,
}) => {
  const languageColor = getLanguageColor(language);

  return (
    <div className={styles.project_link}>
      <div className={styles.project_header}>
        <div className={styles.project_icon_name}>
          <Icon icon={icon || AudioLines} className={styles.project_icon} />
          <Link className={styles.project_name_link} to={`/`}>
            <span className={styles.project_name_text}>{name}</span>
          </Link>
        </div>
        <span className={styles.visibility_badge}>{visibility}</span>
      </div>
      {description && (
        <p className={styles.project_description}>{description}</p>
      )}
      <div className={styles.project_footer}>
        <div className={styles.language_info}>
          <span
            className={styles.language_dot}
            style={{ backgroundColor: languageColor }}
          ></span>
          <span className={styles.language_text}>{language}</span>
        </div>
        <div className={styles.stars_info}>
          <Icon icon={Star} className={styles.star_icon} />
          <span className={styles.star_count}>
            {renderNumberWithAbbreviations(stars)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
