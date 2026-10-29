import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Approach | VLOXIA Systems LLP",
  description: "VLOXIA's five-step solution process: Understand → Analyse → Recommend → Implement → Support.",
};

const steps = [
  {
    n: "01",
    icon: "🎯",
    title: "Understand",
    desc: "We begin every engagement by deeply understanding your energy needs, current consumption patterns, site characteristics and business goals. No assumptions — just careful listening.",
    details: ["Site visit & energy audit", "Load analysis & consumption profiling", "Understanding regulatory and grid conditions", "Budget and timeline alignment"],
  },
  {
    n: "02",
    icon: "📊",
    title: "Analyse",
    desc: "Our technical team analyses the data to determine the optimal energy mix — sizing solar systems, battery banks, charging loads and inverter configurations for your specific context.",
    details: ["Solar resource assessment", "Load flow analysis", "Financial modelling & ROI calculation", "Grid interconnection study"],
  },
  {
    n: "03",
    icon: "💡",
    title: "Recommend",
    desc: "We present a clear, customised system design with product specifications, layout drawings, financial projections and a detailed implementation plan — for your informed decision.",
    details: ["System design & single-line diagrams", "Product selection & bill of materials", "Financial projections & payback analysis", "Multiple configuration options"],
  },
  {
    n: "04",
    icon: "⚙️",
    title: "Implement",
    desc: "Professional, safe and on-schedule installation by certified technicians. We manage everything — from sourcing and logistics to civil works, electrical installation and commissioning.",
    details: ["Project management & scheduling", "Civil & structural works", "Electrical installation & wiring", "Testing, commissioning & grid approval"],
  },
  {
    n: "05",
    icon: "🛡️",
    title: "Support",
    desc: "Our relationship doesn&apos;t end at handover. We provide ongoing monitoring, preventive maintenance, performance reporting and prompt after-sales service throughout the system&apos;s life.",
    details: ["Remote monitoring & alerts", "Preventive maintenance schedules", "Performance reporting & analytics", "Warranty management & spare support"],
  },
];

export default function ApproachPage() {
  return (
    <main className="content-page approach-page">
      <section className="content-hero">
        <div className="content-hero-glow" />
        <div className="content-hero-inner">
          <p className="content-eyebrow">How We Work</p>
          <h1>Our Solution Approach</h1>
          <p>
            A proven five-step process that ensures every VLOXIA customer gets the right solution, installed right, supported right.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="content-container">
          <div className="approach-steps">
            {steps.map((step) => (
              <div key={step.n} className="approach-step">
                <div className="approach-step-heading">
                  <div className="approach-step-icon">
                    {step.icon}
                  </div>
                  <div className="approach-step-number">{step.n}</div>
                  <div className="approach-step-title">{step.title}</div>
                </div>
                <div className="approach-step-content">
                  <p>{step.desc}</p>
                  <div className="approach-detail-list">
                    {step.details.map((d) => (
                      <div key={d}>
                        <span aria-hidden="true" />{d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="content-section ecosystem-section">
        <div className="content-container">
          <p className="content-eyebrow">The Ecosystem</p>
          <h2>Generate → Store → Power → Move</h2>
          <p className="ecosystem-intro">
            VLOXIA&apos;s integrated approach means your solar, storage, inverter and EV charger work as one intelligent energy system.
          </p>
          <div className="ecosystem-flow">
            {[
              { icon: "☀️", label: "Solar", sub: "Generate" },
              { icon: "→", label: "", sub: "" },
              { icon: "🔋", label: "Battery", sub: "Store" },
              { icon: "→", label: "", sub: "" },
              { icon: "⚡", label: "Inverter", sub: "Power" },
              { icon: "→", label: "", sub: "" },
              { icon: "🚗", label: "EV Charger", sub: "Move" },
            ].map((item, i) => (
              item.icon === "→"
                ? <div key={i} className="ecosystem-arrow">→</div>
                : <div key={i} className="ecosystem-node">
                    <div>{item.icon}</div>
                    <div>{item.sub}</div>
                    <div>{item.label}</div>
                  </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-cta-section">
        <div className="content-cta">
          <h2>Start with Step 1 — Understand</h2>
          <p>Tell us about your energy needs and we&apos;ll take it from there.</p>
          <Link href="/contact" className="content-button">
            Begin Your Energy Journey <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
