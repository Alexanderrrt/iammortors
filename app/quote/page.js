import Header from "../components/Header";
import Footer from "../components/Footer";
import QuoteCalculator from "./QuoteCalculator";
import QuoteIntro from "./QuoteIntro";
import { getPricing } from "../../lib/pricing-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Get a Quote — Instant Price Estimate",
  description:
    "Get an instant price estimate for your vehicle. Select services, see the estimated range, and send your quote request via WhatsApp.",
  alternates: { canonical: "/quote" },
};

export default async function QuotePage() {
  const pricing = await getPricing();
  return (
    <>
      <Header />
      <main className="section">
        <div className="section__inner">
          <QuoteIntro />
          <QuoteCalculator pricing={pricing} />
        </div>
      </main>
      <Footer />
    </>
  );
}
