"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
// @ts-ignore
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

export default function ProgressBar() {
  const pathname = usePathname();
  const loading = useRef(false);

  // Stop progress when path changes (new page loaded)
  useEffect(() => {
    if (loading.current) {
      NProgress.done();
      loading.current = false;
    }
  }, [pathname]);

  // Start progress when internal link clicked
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        "a",
      ) as HTMLAnchorElement | null;
      if (!target) return;

      const hrefAttribute = target.getAttribute("href");
      if (!hrefAttribute) return;

      // Skip invalid or non-navigation links
      if (
        hrefAttribute.startsWith("#") ||
        hrefAttribute.startsWith("mailto:") ||
        hrefAttribute.startsWith("javascript:")
      ) {
        return;
      }

      // Parse current and target URLs
      const currentUrl = new URL(window.location.href);
      const targetUrl = new URL(target.href, window.location.origin);

      const isExternal = targetUrl.origin !== currentUrl.origin;
      const isSamePath = targetUrl.pathname === currentUrl.pathname;
      const hasTabParam = targetUrl.searchParams.has("tab");

      // If external, let browser handle it (no progress bar usually needed for new tab, but if same tab it loads)
      // Standard NProgress usually runs for internal navigation.
      // If same path AND has 'tab' param, skip progress bar (as requested)
      if (isSamePath && hasTabParam) {
        return;
      }

      if (!isExternal && !isSamePath) {
        NProgress.start();
        loading.current = true;
      } else if (!isExternal && isSamePath && !hasTabParam) {
        // Trigger for other query params on same page
        NProgress.start();
        loading.current = true;
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
