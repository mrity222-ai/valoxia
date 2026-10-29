"use client";
import Link from "next/link";
import { ArrowRight, Zap, Sun, Battery, Power, ChevronDown } from "lucide-react";

const solutions = [
  {
    icon: Zap,
    title: "EV Charging",
    desc: "AC & DC fast chargers for home, commercial, fleet and public infrastructure.",
    href: "/solutions/ev-charging",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Sun,
    title: "Solar Energy",
    desc: "Residential, commercial & industrial rooftop solar systems with grid integration.",
    href: "/solutions/solar-energy",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Battery,
    title: "Energy Storage",
    desc: "Lithium battery systems for backup power, load shifting and energy independence.",
    href: "/solutions/energy-storage",
    color: "from-green-400 to-emerald-600",
  },
  {
    icon: Power,
    title: "Power Solutions",
    desc: "Inverters, power backup and integrated energy management for all sectors.",
    href: "/solutions/power-solutions",
    color: "from-purple-500 to-pink-500",
  },
];

const stats = [
  { value: "4+", label: "Energy Verticals" },
  { value: "Pan-India", label: "Reach" },
  { value: "OEM", label: "Partnerships" },
  { value: "24/7", label: "Support" },
];

export default function HomePage() {
  return (
    <div className="home-page">
      {/* ── HERO ── */}
      <section className="home-hero">
        {/* Background grid */}
        <div
          
          
        />
        {/* Radial glow */}
        <div  />
        <div  />

        <div >
          {/* Badge */}
          <div >
            <span  />
            Technology-Led Clean Energy Solutions
          </div>

          <h1 >
            Powering Mobility.{" "}
            <span >Harnessing Energy.</span>
            <br />
            Enabling a Sustainable Future.
          </h1>
          <p >
            VLOXIA Systems LLP delivers integrated clean energy solutions — from EV charging
            infrastructure to solar power, lithium storage and power management — built for
            India&apos;s energy transition.
          </p>

          <div >
            <Link
              href="#solutions"
              
            >
              Explore Our Solutions <ArrowRight  />
            </Link>
            <Link
              href="/contact"
              
            >
              Get a Quote ↗
            </Link>
          </div>

          {/* Stats */}
          <div >
            {stats.map((s) => (
              <div key={s.label} >
                <div >{s.value}</div>
                <div >{s.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div >
            <span >SCROLL</span>
            <ChevronDown  />
          </div>
        </div>
      </section>

      <section aria-label="VLOXIA clean energy promise" className="feature-rail">
        <p>Smarter energy for homes, businesses and mobility.</p>
        <Link href="/solutions/ev-charging">Explore VLOXIA solutions <ArrowRight /></Link>
      </section>

      {/* ── COMPANY INTRO ── */}
      <section className="home-intro">
        <div >
          <div >
            <div>
              <p >
                Who We Are
              </p>
              <h2 >
                India&apos;s Integrated Clean Energy Partner
              </h2>
              <p >
                VLOXIA Systems LLP is a Delhi-based technology-driven company operating across four
                clean energy verticals: EV Charging Infrastructure, Solar Energy Systems, Lithium
                Battery Storage and Power Solutions.
              </p>
              <p >
                We combine OEM-grade technology partnerships with a consultative approach — helping
                residential, commercial and industrial clients design, deploy and manage their energy
                ecosystems for maximum efficiency, reliability and sustainability.
              </p>
              <Link
                href="/about"
                
              >
                Learn More About Us <ArrowRight  />
              </Link>
            </div>
            <div >
              {[
                { title: "Technology-Led", desc: "OEM-grade product portfolio with proven global technology" },
                { title: "Multi-Vertical", desc: "Four energy domains under one integrated roof" },
                { title: "Customised", desc: "Tailored recommendations for every site and use case" },
                { title: "Scalable", desc: "Solutions that grow with your energy needs" },
              ].map((item) => (
                <div key={item.title} >
                  <div >
                    <div  />
                  </div>
                  <h3 >{item.title}</h3>
                  <p >{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUR SOLUTIONS ── */}
      <section id="solutions"  className="home-solutions">
        <div >
          <div >
            <p >
              What We Offer
            </p>
            <h2 >Our Four Core Solutions</h2>
            <p >
              An integrated ecosystem that generates, stores, manages and moves energy — all under one partner.
            </p>
          </div>
          <div >
            {solutions.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                
              >
                <div >
                  <s.icon  />
                </div>
                <h3 >{s.title}</h3>
                <p >{s.desc}</p>
                <span >
                  Learn More <ArrowRight  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY VLOXIA ── */}
      <section className="home-advantages">
        <div >
          <div >
            <p >Our Edge</p>
            <h2 >Why Choose VLOXIA?</h2>
          </div>
          <div >
            {[
              { n: "01", title: "Technology-Led Approach", desc: "We source from leading OEMs and integrate proven global technology into every solution." },
              { n: "02", title: "Multiple Energy Verticals", desc: "EV, Solar, Storage and Power — one partner for your entire clean energy journey." },
              { n: "03", title: "Customised Recommendations", desc: "Site assessment, load analysis and tailored system design for every client." },
              { n: "04", title: "OEM Ecosystem", desc: "Direct technology partnerships ensuring product quality, warranty and support." },
              { n: "05", title: "Scalable Systems", desc: "Solutions designed to scale with your growth — from single home to large industrial campus." },
              { n: "06", title: "Channel Network", desc: "Expanding dealer, distributor and installer network across India." },
            ].map((item) => (
              <div key={item.n} >
                <div >
                  {item.n}
                </div>
                <h3 >{item.title}</h3>
                <p >{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="home-partners">
        <div >
          <p >Technology Partners</p>
          <h2 >Our Technology Partners</h2>
          <p >
            We collaborate with established OEM brands to deliver reliable, certified products.
          </p>
          <div >
            <div >
              <div >TATA EZ POWER</div>
              <div >EV Charging Technology</div>
            </div>
            <div >
              <div >+ More Partners</div>
              <div >Expanding Portfolio</div>
            </div>
          </div>
          <Link href="/partners" >
            View All Partners <ArrowRight  />
          </Link>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="home-industries">
        <div >
          <div >
            <p >Who We Serve</p>
            <h2 >Industries We Serve</h2>
          </div>
          <div >
            {[
              { icon: "🏠", label: "Residential", desc: "Homes & Apartments" },
              { icon: "🏢", label: "Commercial", desc: "Offices & Retail" },
              { icon: "🏭", label: "Industrial", desc: "Factories & Plants" },
              { icon: "🚗", label: "Mobility", desc: "Fleets & Transport" },
              { icon: "🏛️", label: "Institutional", desc: "Schools & Hospitals" },
            ].map((seg) => (
              <Link
                key={seg.label}
                href={`/industries#${seg.label.toLowerCase()}`}
                
              >
                <div >{seg.icon}</div>
                <h3 >{seg.label}</h3>
                <p >{seg.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="home-process">
        <div >
          <div >
            <p >How We Work</p>
            <h2 >Our Solution Process</h2>
          </div>
          <div >
            {[
              { step: "01", label: "Understand", icon: "🎯", desc: "We listen to your energy needs and site requirements." },
              { step: "02", label: "Analyse", icon: "📊", desc: "Load analysis, site assessment and feasibility study." },
              { step: "03", label: "Recommend", icon: "💡", desc: "Customised system design and product selection." },
              { step: "04", label: "Implement", icon: "⚙️", desc: "Professional installation and commissioning." },
              { step: "05", label: "Support", icon: "🛡️", desc: "Ongoing monitoring, maintenance and after-sales care." },
            ].map((item, i, arr) => (
              <div key={item.step} >
                <div >
                  <div >
                    <span >{item.icon}</span>
                  </div>
                  <div >{item.step}</div>
                  <div >{item.label}</div>
                  <div >{item.desc}</div>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section className="home-ecosystem">
        <div >
          <div >
            <p >The Ecosystem</p>
            <h2 >Generate → Store → Power → Move</h2>
            <p >
              A connected clean energy loop — solar panels generate power, batteries store it, inverters distribute it, and EV chargers use it.
            </p>
          </div>
          <div >
            {[
              { icon: Sun, label: "Generate", sub: "Solar Energy", color: "from-yellow-400 to-orange-400" },
              { icon: Battery, label: "Store", sub: "Lithium Storage", color: "from-green-400 to-emerald-500" },
              { icon: Power, label: "Power", sub: "Inverters & Backup", color: "from-purple-400 to-violet-500" },
              { icon: Zap, label: "Move", sub: "EV Charging", color: "from-blue-400 to-cyan-400" },
            ].map((item, i, arr) => (
              <div key={item.label} >
                <div >
                  <item.icon  />
                </div>
                <div >{item.label}</div>
                <div >{item.sub}</div>
                {i < arr.length - 1 && (
                  <ArrowRight  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHANNEL PARTNER CTA ── */}
      <section className="home-channel">
        <div >
          <div >
            <div>
              <p >Partner With Us</p>
              <h2 >Become a Channel Partner</h2>
              <p >
                Dealers, distributors, installers, EPC companies and business partners — join the VLOXIA energy network and grow together.
              </p>
            </div>
            <Link
              href="/partners#channel-partner"
              
            >
              Partner Enquiry <ArrowRight  />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-faq">
        <div className="section-heading">
          <p className="eyebrow">Need to know</p>
          <h2>Frequently asked questions</h2>
          <p>Some quick answers about choosing and planning a clean energy system.</p>
        </div>
        <div className="faq-list">
          <details><summary>Which VLOXIA solutions can I enquire about?</summary><p>We work across EV charging, solar energy, lithium storage and power solutions. You can enquire about one solution or a combination.</p></details>
          <details><summary>Can solutions be planned for homes and businesses?</summary><p>Yes. We work with residential, commercial, industrial and institutional customers, and tailor recommendations to each site.</p></details>
          <details><summary>How do I get a recommendation for my site?</summary><p>Share your location, customer type and energy requirement through the enquiry form. Our team can follow up to understand your needs.</p></details>
          <details><summary>Can I become a VLOXIA channel partner?</summary><p>Dealers, distributors, installers and EPC companies can reach us through the channel partner enquiry page.</p></details>
        </div>
      </section>

      <section className="home-guides">
        <div className="section-heading section-heading-row">
          <div><p className="eyebrow">Explore VLOXIA</p><h2>Find the right energy solution</h2></div>
          <Link href="/solutions/ev-charging">View all solutions <ArrowRight /></Link>
        </div>
        <div className="guide-grid">
          <Link href="/solutions/ev-charging"><span>EV CHARGING</span><h3>Charging for homes, workplaces and fleets</h3><p>Explore AC and DC charging options for different sites and use cases.</p><b>Explore EV charging <ArrowRight /></b></Link>
          <Link href="/solutions/solar-energy"><span>SOLAR ENERGY</span><h3>Generate power from your rooftop</h3><p>Learn about solar systems for residential, commercial and industrial needs.</p><b>Explore solar <ArrowRight /></b></Link>
          <Link href="/solutions/energy-storage"><span>ENERGY STORAGE</span><h3>Store energy for when you need it</h3><p>See lithium storage options for backup power and energy management.</p><b>Explore storage <ArrowRight /></b></Link>
        </div>
      </section>

      {/* ── ENQUIRY SECTION ── */}
      <section className="home-enquiry">
        <div >
          <div >
            <p >Get Started</p>
            <h2 >Let&apos;s Build Your Energy Solution</h2>
            <p >Tell us about your requirement and our experts will get back to you within 24 hours.</p>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}

function EnquiryForm() {
  return (
    <form >
      <div >
        <div>
          <label >Full Name *</label>
          <input type="text" placeholder="Your full name"  />
        </div>
        <div>
          <label >Phone Number *</label>
          <input type="tel" placeholder="+91 XXXXX XXXXX"  />
        </div>
      </div>
      <div>
        <label >Business Email</label>
        <input type="email" placeholder="you@company.com"  />
      </div>
      <div >
        <div>
          <label >Interested Solution *</label>
          <select >
            <option value="">Select a solution</option>
            <option>EV Charging</option>
            <option>Solar Energy</option>
            <option>Energy Storage & Lithium</option>
            <option>Power Solutions</option>
            <option>Multiple Solutions</option>
          </select>
        </div>
        <div>
          <label >Customer Type *</label>
          <select >
            <option value="">Select type</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Industrial</option>
            <option>Dealer / Channel Partner</option>
            <option>Institutional</option>
          </select>
        </div>
      </div>
      <div>
        <label >City / Location</label>
        <input type="text" placeholder="Your city or location"  />
      </div>
      <div>
        <label >Tell us about your requirement</label>
        <textarea rows={4} placeholder="Describe your energy requirement, site details, or any specific questions..."  />
      </div>
      <button type="submit" >
        Submit Enquiry <ArrowRight  />
      </button>
      <p >We typically respond within 24 business hours.</p>
    </form>
  );
}
