// src/app/page.tsx
import Hero from "./components/home/Hero";
import ToolsRail from "./components/home/ToolsRail";
import ProjectsGrid from "./components/home/ProjectsGrid";
import ClientsMarquee from "./components/home/ClientsMarquee";
import CTA from "./components/home/CTA";

export default function HomePage() {
  return (
    <main className="relative flex flex-col">
      {/* Hero section */}
      <Hero />

      {/* Tools rail */}
      <ToolsRail />

      {/* Projects */}
      <section
        id="projects"
        className="mx-auto w-full max-w-7xl px+5 py-20 lg:px-10"
      >
        <ProjectsGrid />
      </section>

      {/* Clients */}
      <section
        id="clients"
        className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10"
      >
        <ClientsMarquee />
      </section>

      {/* CTA FULL WIDTH */}
      <CTA />
    </main>
  );
}
