import React from "react";
import SaleBanner from "./components/SaleBanner"; // adjust the path if different
import Header from "./components/Header";
import Footer from "./components/Footer";
import FAQ from "./components/faq/FAQ";
import FreeClass from "./components/freeclass/FreeClass";
import Journey from "./components/journey/Journey";
import ContactHero from "./components/contact/ContactHero";

const Home: React.FC = () => {
  return (
    <>
        <SaleBanner />
        <Header onCtaClick={() => window.location.assign("#book")} />
        <ContactHero/>
        <Journey />
        <FAQ />
        <Footer />
    </>
  );
};

export default Home;
