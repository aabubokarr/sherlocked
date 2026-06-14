"use client";

import { useEffect } from "react";
import { BackgroundAmbience } from "@/components/portfolio/background-ambience";
import { CodeShowcase } from "@/components/portfolio/code-showcase";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { Hero } from "@/components/portfolio/hero";
import { Metrics } from "@/components/portfolio/metrics";
import { QuerySimulator } from "@/components/portfolio/query-simulator";
import { ShowcaseTabs } from "@/components/portfolio/showcase-tabs";

export default function Portfolio() {
  // Support deep links like /#demo when arriving from the chatbot navbar.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      <BackgroundAmbience />
      <Hero />
      <Metrics />
      <QuerySimulator />
      <ShowcaseTabs />
      <CodeShowcase />
      <Contact />
      <Footer />
    </div>
  );
}
