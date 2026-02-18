import styles from "./skeleton.module.scss";
interface skeletonProps {
  customStyles?: React.CSSProperties;
}
const Skeleton = ({ customStyles }: skeletonProps) => {
  return (
    <div
      className={styles.skeleton}
      style={customStyles ? customStyles : {}}
    ></div>
  );
};

export default Skeleton;
