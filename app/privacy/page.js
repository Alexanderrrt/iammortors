import Header from "../components/Header";
import Footer from "../components/Footer";
import LegalDocument from "../components/LegalDocument";
import { PRIVACY_DOCUMENT } from "../legal-content";

export const metadata = {
  title: "Privacy Policy — IAM Motors",
  description: "How IAM Motors collects, uses, stores, and protects information submitted through estimates, photos, and appointment requests.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <LegalDocument document={PRIVACY_DOCUMENT} />
      <Footer />
    </>
  );
}
