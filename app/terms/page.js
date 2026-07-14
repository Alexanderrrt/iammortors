import Header from "../components/Header";
import Footer from "../components/Footer";
import LegalDocument from "../components/LegalDocument";
import { TERMS_DOCUMENT } from "../legal-content";

export const metadata = {
  title: "Terms of Use — IAM Motors",
  description: "Terms governing use of the IAM Motors website, preliminary estimates, AI photo analysis, communications, and appointment requests.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <LegalDocument document={TERMS_DOCUMENT} />
      <Footer />
    </>
  );
}
