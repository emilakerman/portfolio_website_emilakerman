import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "time to vote",
  description: "Cast your vote!",
};

export default function AmsterdampLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
