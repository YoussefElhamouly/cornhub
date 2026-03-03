import { Suspense } from "react";
import LayoutSkeleton from "./LayoutSkeleton";
import LayoutData from "./LayoutData";
export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<LayoutSkeleton />}>
      <LayoutData>{children}</LayoutData>
    </Suspense>
  );
}
