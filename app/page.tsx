import AuthorSection from "@/components/AuthorSection";
import BookThesis from "@/components/BookThesis";
import EditorialSection from "@/components/EditorialSection";
import Hero from "@/components/Hero";
import PhilosopherBridge from "@/components/PhilosopherBridge";
import ReleaseSignup from "@/components/ReleaseSignup";
import RevealObserver from "@/components/RevealObserver";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import VirtuesIndex from "@/components/VirtuesIndex";

export default function Page() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <SiteHeader />
      <main>
        <Hero />
        <BookThesis />
        <EditorialSection />
        <VirtuesIndex />
        <AuthorSection />
        <PhilosopherBridge />
        <ReleaseSignup />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
