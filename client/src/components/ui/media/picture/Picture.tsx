"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Skeleton from "../../feedback/skeleton/Skeleton";
import styles from "./picture.module.scss";

interface pictureProps {
  src: string;
  alt?: string;
  customStyles?: React.CSSProperties;
}
const Picture = ({ src, alt = "", customStyles }: pictureProps) => {
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {});
  return (
    <div className={styles.container} style={customStyles && customStyles}>
      <figure style={{ backgroundImage: `url(${src})` }}></figure>
      <img
        src={src}
        alt={alt}
        onLoad={() => {
          setIsloading(false);
        }}
      />
      {isLoading && <Skeleton />}
    </div>
  );
};

export default Picture;
