import Header from "../components/Header";
import Footer from "../components/Footer";
import QuoteChatbot from "../components/QuoteChatbot";
import QuoteIntro from "./QuoteIntro";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Get a Quote — Chat for an Instant Estimate",
  description:
    "Describe your vehicle and the damage in your own words and our assistant builds an instant price estimate, then books your appointment.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <Header />
      <main className="section">
        <div className="section__inner qchat__page">
          <QuoteIntro />
          <QuoteChatbot />
        </div>
      </main>
      <Footer />
    </>
  );
}
