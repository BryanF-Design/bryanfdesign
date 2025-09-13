import Hero from "./components/Hero";
import Section from "./components/Section";

export default function Home() {
  return (
    <main className="bg-[#0f0f10] text-white">
      <Hero />

      {/* Ejemplo de highlights; puedes quitarlo o editarlo */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Velocidad", d: "Core Web Vitals en verde, siempre." },
            { t: "SEO real", d: "Estructura, schema, OG y contenido que posiciona." },
            { t: "Marca", d: "UI sobria, microinteracciones y coherencia visual." },
          ].map((i, k) => (
            <div
              key={k}
              data-reveal
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:-translate-y-1 transition-transform"
            >
              <h3 className="font-bold text-lg">{i.t}</h3>
              <p className="text-white/70 mt-2">{i.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
