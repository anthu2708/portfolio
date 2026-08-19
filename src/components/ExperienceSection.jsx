const experiences = [
  {
    role: "Software Engineering Intern",
    company: "Planview",
    period: "Jan 2026 – Aug 2026",
    location: "Vancouver, BC",
    bullets: [
      "Led decommission of a legacy Kafka Streams metrics platform across 5 services, freeing ~206 GiB RAM in dedicated infrastructure capacity.",
      "Consolidated two Apache Spark pipelines on AWS EMR into a shared workflow, unifying duplicated transformations and reducing EMR processing cost by 15%.",
      "Built an Apache Spark garbage-collection job in Java on AWS EMR with dry-run and backup safeguards, running weekly cleanup across 8 Aurora tables in 10,000-row batches.",
      "Migrated a service out of a shared Kubernetes monorepo onto standalone AWS EKS, reducing CI/CD build time from over 1 hour to 8 minutes.",
      "Built a custom Claude Skill to automate Spark reprocessing on AWS EMR, reducing setup time from 10 minutes to 1 minute per job.",
    ],
  },
  {
    role: "Undergraduate Teaching Assistant",
    company: "University of British Columbia",
    period: "Sep 2025 – Present",
    location: "Vancouver, BC",
    bullets: [
      "Assisted in teaching MATH 100 to over 100 students, leading tutorials and clarifying core calculus concepts.",
      "Coordinated with instructors to align assessments and provide feedback, improving student support.",
    ],
  },
  {
    role: "Backend Engineering Intern",
    company: "Thang Long Software Solution",
    period: "May 2024 – Aug 2024",
    location: "Hanoi, Vietnam",
    bullets: [
      "Optimized PostgreSQL queries and redesigned schemas for 700+ administrative units, reducing query response time by ~30%.",
      "Automated backend data extraction and reporting workflows in C++, reducing repetitive manual reporting across departments.",
      "Debugged backend defects by tracing data flow and contributing maintainable fixes across database and service-layer components.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="border-t border-white/8 px-10 py-20"
    >
      <div className="mx-auto max-w-[1140px]">
        <p className="m-0 mb-10 font-mono text-[11px] tracking-[.28em] text-[#6f737c] uppercase">
          III — Experience
        </p>

        <div className="flex flex-col gap-12">
          {experiences.map((exp, i) => (
            <div key={i} className="flex flex-wrap gap-x-[clamp(32px,5vw,72px)] gap-y-4">
              <div className="w-[clamp(180px,20vw,240px)] shrink-0 pt-[3px]">
                <p className="m-0 font-mono text-[11px] leading-loose tracking-[.1em] text-paper-500 uppercase">
                  {exp.period}
                </p>
                <p className="m-0 font-mono text-[11px] leading-loose tracking-[.08em] text-[#6f737c]">
                  {exp.location}
                </p>
              </div>

              <div className="flex min-w-70 flex-1 basis-80 flex-col gap-3">
                <div>
                  <h3 className="m-0 font-display text-[clamp(15px,1.5vw,19px)] font-semibold leading-snug text-paper-100">
                    {exp.role}
                  </h3>
                  <p className="m-0 mt-[3px] font-mono text-[12px] tracking-[.08em] text-paper-500">
                    {exp.company}
                  </p>
                </div>
                <div className="h-px w-10 bg-gradient-to-r from-[rgba(215,217,222,.4)] to-transparent" />
                <ul className="m-0 flex flex-col gap-2 pl-0 list-none">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-[14px] leading-relaxed text-paper-300">
                      <span className="mt-[6px] h-[5px] w-[5px] shrink-0 rounded-full bg-[rgba(215,217,222,.2)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
