"use client";

import { useEffect } from "react";
import { reportWebVitals } from "@/shared/lib/web-vitals";

export function WebVitals() {
  useEffect(() => {
    reportWebVitals((metric) => {
      // Send to analytics service
      console.log(metric);
      // Example: gtag('event', metric.name, { value: metric.value });
    });
  }, []);

  return null;
}
