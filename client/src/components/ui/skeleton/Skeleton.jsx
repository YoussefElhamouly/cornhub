import styles from "./skeleton.module.scss";
const Skeleton = ({ customStyles }) => {
  return (
    <div
      className={styles.skeleton}
      style={customStyles ? customStyles : {}}
    ></div>
  );
};

export default Skeleton;
