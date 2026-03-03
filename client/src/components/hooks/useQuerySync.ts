"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * A hook to synchronize a component's value with a URL query parameter.
 * Behavior is opt-in via the queryKey argument.
 */
export const useQuerySync = (queryKey?: string | null) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = useCallback(
    (value: string | null | undefined) => {
      if (!queryKey) return;

      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (!value) {
        current.delete(queryKey);
      } else {
        current.set(queryKey, value);
      }

      const search = current.toString();
      const query = search ? `?${search}` : "";

      router.replace(`${pathname}${query}`);
    },
    [router, pathname, searchParams, queryKey],
  );

  return { updateQuery };
};
