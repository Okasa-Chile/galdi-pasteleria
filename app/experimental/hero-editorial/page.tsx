import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fraunces, Inter } from "next/font/google";

// Fuentes cargadas y aplicadas SOLO dentro de esta ruta experimental
// (variables CSS con scope local, sin tocar app/layout.tsx).
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-hero-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-hero-body",
});

export const metadata: Metadata = {
  title: "Preview Hero Editorial — Galdi",
  robots: { index: false, follow: false },
};

export default function PreviewHeroEditorial() {
  return (
    <main
      className={`${fraunces.variable} ${inter.variable} hero-editorial-root overflow-x-hidden bg-[#F7F1E8] text-[#221D1A]`}
      style={{ fontFamily: "var(--font-hero-body)" }}
    >
      <style>{`
        @keyframes heroEditorialFadeUp {
          from { opacity: 0; transform: translateY(24px); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .hero-editorial-fade {
          opacity: 0;
          animation: heroEditorialFadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-editorial-cta {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-editorial-cta:hover {
          transform: translateY(-2px);
        }
        .hero-editorial-cta:active {
          transform: translateY(0) scale(0.98);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-editorial-fade {
            animation: none;
            opacity: 1;
            transform: none;
            filter: none;
          }
          .hero-editorial-cta {
            transition: none;
          }
        }

        /* Layout responsivo: mobile = stack (foto arriba, texto abajo),
           desktop (>=1024px) = grid 2 columnas (texto 45% / foto 55%).
           Implementado en bloque de estilo propio porque las variantes
           responsivas de Tailwind (sm:/lg:) no compilan en este proyecto. */
        .hero-editorial-root {
          display: flex;
          flex-direction: column;
        }
        .hero-editorial-text {
          order: 2;
        }
        .hero-editorial-photo {
          order: 1;
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 2;
        }
        @media (min-width: 1024px) {
          .hero-editorial-root {
            display: grid;
            grid-template-columns: 45% 55%;
            min-height: 100dvh;
          }
          .hero-editorial-text {
            order: 0;
            height: 100dvh;
          }
          .hero-editorial-photo {
            order: 0;
            aspect-ratio: auto;
            height: 100dvh;
          }
        }
      `}</style>

      {/* Columna de texto: 45% en desktop, centrada verticalmente; segunda en mobile */}
      <section
        className="hero-editorial-text flex flex-col items-start justify-center"
        style={{
          gap: "1.25rem",
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          paddingBlock: "clamp(3.5rem, 6vw, 4rem)",
          background:
            "radial-gradient(ellipse at 25% 15%, rgba(176,83,43,0.07) 0%, transparent 55%), #F7F1E8",
        }}
      >
        <span
          className="hero-editorial-fade text-[0.7rem] uppercase tracking-[0.18em] text-[#221D1A]/50"
          style={{ animationDelay: "0ms" }}
        >
          Repostería artesanal — Maipú
        </span>

        <h1
          className="hero-editorial-fade text-[#221D1A]"
          style={{
            fontFamily: "var(--font-hero-display)",
            fontSize: "clamp(3.25rem, 9vw, 7.5rem)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            animationDelay: "110ms",
          }}
        >
          Galdi
        </h1>

        <p
          className="hero-editorial-fade italic text-[#B0532B]"
          style={{
            fontFamily: "var(--font-hero-display)",
            fontSize: "clamp(1.15rem, 1.8vw, 1.6rem)",
            animationDelay: "220ms",
          }}
        >
          El sabor de lo hecho con cariño
        </p>

        <p
          className="hero-editorial-fade max-w-[45ch] text-[0.95rem] text-[#221D1A]/70"
          style={{ lineHeight: 1.625, animationDelay: "320ms" }}
        >
          Tortas a la medida, pastelería chilena tradicional y catering para
          tus celebraciones: cada pieza hecha a mano, con el mismo cariño de
          siempre.
        </p>

        <div
          className="hero-editorial-fade flex flex-wrap items-center"
          style={{ gap: "1rem", paddingTop: "0.5rem", animationDelay: "420ms" }}
        >
          <Link
            href="/productos"
            className="hero-editorial-cta rounded-full bg-[#B0532B] text-[0.8rem] tracking-[0.05em] text-[#FAF6F0] uppercase shadow-[0_8px_30px_rgba(176,83,43,0.25)]"
            style={{
              paddingInline: "2rem",
              paddingBlock: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Ver productos
          </Link>
          <Link
            href="/contacto"
            className="hero-editorial-cta rounded-full border border-[#221D1A]/25 text-[0.8rem] tracking-[0.05em] text-[#221D1A] uppercase"
            style={{
              paddingInline: "2rem",
              paddingBlock: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Cotizar catering
          </Link>
        </div>
      </section>

      {/* Columna fotográfica: 55% en desktop a toda altura; primera en mobile con aspect-ratio 3:2 */}
      <section className="hero-editorial-photo">
        <Image
          src="/experimental/hero-editorial.webp"
          alt="Torta artesanal de mil hojas con crema y nueces sobre mesa de madera con luz natural"
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "center" }}
        />
      </section>
    </main>
  );
}
