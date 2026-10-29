"use client";

import React, { useState, useEffect } from "react";
import { Plus, Wrench, Edit2, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "EV Charging",
    subtitle: "",
    description: "",
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.services) setServices(data.services);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setModalOpen(false);
      fetchServices();
    } catch (e) {
      alert("Failed to save service");
    }
  };

  return (
    <div >
      <div >
        <div>
          <h2 >Services & Solutions CMS</h2>
          <p >
            Update EV charging, solar energy, storage systems and power solutions content
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          
        >
          <Plus  />
          <span>Add New Service Offering</span>
        </button>
      </div>

      <div >
        {[
          {
            title: "EV Charging Infrastructure",
            cat: "EV Charging",
            desc: "AC Wallboxes (3.3-22 kW) & DC Fast Chargers (30-120 kW+) with smart RFID and cloud billing.",
          },
          {
            title: "Solar Rooftop & Ground-mount",
            cat: "Solar Energy",
            desc: "High-efficiency commercial and residential solar power systems with net metering integration.",
          },
          {
            title: "Lithium LiFePO4 Energy Storage",
            cat: "Energy Storage",
            desc: "5.12 kWh to MWh-scale modular lithium battery packs with smart BMS and 6000+ cycle life.",
          },
          {
            title: "Hybrid Power & Backup Management",
            cat: "Power Solutions",
            desc: "Hybrid inverters, critical load UPS, automatic transfer switches and intelligent load shifting.",
          },
          ...services,
        ].map((s, idx) => (
          <div key={idx} >
            <div>
              <span >
                {s.category || s.cat}
              </span>
              <h3 >{s.title}</h3>
              <p >{s.description || s.desc}</p>
            </div>
            <div >
              <span >
                <CheckCircle2  /> Active on Website
              </span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div >
          <div  onClick={() => setModalOpen(false)} />
          <div >
            <h3 >Add Service Offering</h3>
            <form onSubmit={handleCreate} >
              <div>
                <label >Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Turnkey Fleet Depot Charging"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  
                />
              </div>

              <div>
                <label >Vertical Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  
                >
                  <option value="EV Charging">EV Charging</option>
                  <option value="Solar Energy">Solar Energy</option>
                  <option value="Energy Storage">Energy Storage</option>
                  <option value="Power Solutions">Power Solutions</option>
                </select>
              </div>

              <div>
                <label >Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Details of the engineering solution..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  
                />
              </div>

              <div >
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
