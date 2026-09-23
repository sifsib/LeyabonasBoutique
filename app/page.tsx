import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Occasions from "@/components/Occasions";
import Groomsmen from "@/components/Groomsmen";
import Collection from "@/components/Collection";
import SignatureDetails from "@/components/SignatureDetails";
import Runway from "@/components/Runway";
import About from "@/components/About";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Occasions />
        <Groomsmen />
        <Collection />
        <SignatureDetails />
        <Runway />
        <About />
        <Visit />
      </main>
      <Footer />
      <StickyWhatsApp />
    </>
  );
}
