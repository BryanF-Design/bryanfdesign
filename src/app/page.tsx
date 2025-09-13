export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white grid place-items-center p-8">
      <div className="max-w-3xl text-center">
        <p className="uppercase tracking-widest text-sm text-neutral-400">BRYANF DESIGN</p>
        <h1 className="mt-3 text-5xl font-bold">Sitios rápidos y SEO pro</h1>
        <p className="mt-4 text-neutral-300">Next.js + diseño a la medida.</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a href="/contacto" className="rounded-xl px-5 py-3 bg-white text-black font-medium">Cotiza</a>
          <a href="/servicios" className="rounded-xl px-5 py-3 ring-1 ring-white/20">Servicios</a>
        </div>
      </div>
    </main>
  );
}
