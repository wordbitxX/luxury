import type { ReactNode } from "react";

// Content is readable from the first server render. Never put a transform on
// the page wrapper: it would change the containing block of fixed dialogs.
export default function Template({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
