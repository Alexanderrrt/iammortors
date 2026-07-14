import { redirect } from "next/navigation";

// The quote chat now lives at /quote. Keep this path working for old links.
export default function QuoteChatRedirect() {
  redirect("/quote");
}
