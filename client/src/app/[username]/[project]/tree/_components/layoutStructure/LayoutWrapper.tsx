import React, { Suspense } from "react";
import LayoutSkeleton from "./LayoutSkeleton";
import LayoutData from "./LayoutData";

interface LayoutWrapperProps {
  children: React.ReactNode;
  params: Promise<{ username: string; project: string; path?: string[] }>;
}

const LayoutWrapper = ({ children, params }: LayoutWrapperProps) => {
  return (
    <Suspense fallback={<LayoutSkeleton />}>
      <LayoutData params={params}>{children}</LayoutData>
    </Suspense>
  );
};

export default LayoutWrapper;
