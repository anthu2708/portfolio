import ProjectCarousel from "./components/ProjectCarousel.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import VisitCard from "./components/VisitCard.jsx";
import TrinketBox from "./components/TrinketBox.jsx";
import { projects } from "./data/projects.js";

export default function App() {
  return (
    <div className="relative w-full bg-[radial-gradient(110%_70%_at_50%_0%,#24262c_0%,#17181c_48%,#101116_100%)] font-body text-[#d7d9de]">
      <div className="pointer-events-none fixed inset-0 z-5 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.012)_0_2px,rgba(0,0,0,0)_2px_5px)]" />

      <TrinketBox />

      <ProjectCarousel />

      <ExperienceSection />

      <div className="mx-auto max-w-[1140px] px-10 pb-35">
        <section className="flex flex-wrap gap-[clamp(32px,5vw,72px)] border-t border-white/8 py-20">
          <VisitCard />
          <div id="cv" className="flex flex-1 basis-70 flex-col gap-4">
            <p className="m-0 font-mono text-[11px] tracking-[.28em] text-[#6f737c] uppercase">V - CV</p>
              <h2 className="m-0 font-display text-[clamp(22px,2.4vw,30px)] font-semibold text-paper-100">
                  <a
                      href="/Resume-AnPhung.pdf?v=20260902"
                      target="_blank"
                      rel="noreferrer"
                      className="border-b border-[#c8cad0]/35 text-[#c8cad0] hover:border-[#f0f1f3]/70 hover:text-[#f0f1f3]"
                  >                   Curriculum Vitae
                  </a>
              </h2>
          </div>
        </section>

        <footer className="flex items-center justify-between gap-6 border-t border-white/8 pt-10 font-mono text-[11px] tracking-[.24em] text-[#6b6f78] uppercase">
          <span>An Phung</span>
          <span>portfolio</span>
        </footer>
      </div>
    </div>
  );
}
