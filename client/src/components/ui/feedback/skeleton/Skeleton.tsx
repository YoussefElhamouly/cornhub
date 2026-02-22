import styles from "./skeleton.module.scss";
interface skeletonProps {
  customStyles?: React.CSSProperties;
  className?: string;
}
const Skeleton = ({ customStyles, className }: skeletonProps) => {
  return (
    <div
      className={`${styles.skeleton} ${className ? className : ""}`}
      style={customStyles ? customStyles : {}}
    ></div>
  );
};

export default Skeleton;
