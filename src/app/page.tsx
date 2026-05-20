import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import VossBlock from "@/components/VossBlock";
import FacilitiesGallery from "@/components/FacilitiesGallery";
import ComparisonTable from "@/components/ComparisonTable";
import Testimonials from "@/components/Testimonials";
import GuiltRelease from "@/components/GuiltRelease";
import PricingTable from "@/components/PricingTable";
import SavingsCalculator from "@/components/SavingsCalculator";
import RiskReversal from "@/components/RiskReversal";
import HowItWorks from "@/components/HowItWorks";
import CheckoutForm from "@/components/CheckoutForm";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import NotificationQueue from "@/components/NotificationQueue";
import ExitIntent from "@/components/ExitIntent";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import CookieConsent from "@/components/CookieConsent";

export default function Home() {
  return (
    <main>
      <StickyBar />
      <NotificationQueue />
      <ExitIntent />
      <AccessibilityWidget />
      <CookieConsent />

      <Hero />
      <SocialProof />
      <VossBlock />
      <FacilitiesGallery />
      <ComparisonTable />
      <Testimonials />
      <GuiltRelease />
      <PricingTable />
      <SavingsCalculator />
      <RiskReversal />
      <HowItWorks />
      <CheckoutForm />
      <Footer />
    </main>
  );
}
