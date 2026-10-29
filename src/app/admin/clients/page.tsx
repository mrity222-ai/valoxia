"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Globe, CheckCircle2, XCircle, Building2 } from "lucide-react";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    logoUrl: "/vloxia-logo.png",
    websiteUrl: "",
    category: "TECHNOLOGY_PARTNER",
    sortOrder: "1",
    isActive: true,
  });

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      if (data.clients) setClients(data.clients);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setModalOpen(false);
      fetchClients();
    } catch (e) {
      alert("Failed to save partner logo");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this partner / client logo?")) return;
    try {
      await fetch("/api/admin/clients", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchClients();
    } catch (e) {
      alert("Failed to delete");
    }
  };

  return (
    <div >
      <div >
        <div>
          <h2 >Partners & Client Logos CMS</h2>
          <p >
            Upload OEM partner badges and client brand logos shown on the public website
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          
        >
          <Plus  />
          <span>Add Partner / Client Logo</span>
        </button>
      </div>

      <div >
        {loading ? (
          <div >Loading logos...</div>
        ) : clients.length === 0 ? (
          <div >No partner logos configured.</div>
        ) : (
          clients.map((c) => (
            <div
              key={c.id}
              
            >
              <div>
                <div >
                  <Image src={c.logoUrl} alt={c.name} width={120} height={40}  />
                </div>
                <div >{c.name}</div>
                <div >{c.category}</div>
                {c.websiteUrl && (
                  <a
                    href={c.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    
                  >
                    <Globe  />
                    <span>{c.websiteUrl}</span>
                  </a>
                )}
              </div>

              <div >
                <span >Order: {c.sortOrder}</span>
                <button
                  onClick={() => handleDelete(c.id)}
                  
                  title="Remove Logo"
                >
                  <Trash2  />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div >
          <div  onClick={() => setModalOpen(false)} />
          <div >
            <h3 >Add Client or Partner Brand</h3>
            <form onSubmit={handleCreate} >
              <div>
                <label >Company / Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tata EZ Power / Schneider"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  
                />
              </div>

              <div>
                <label >Logo Image URL *</label>
                <input
                  type="text"
                  required
                  placeholder="/vloxia-logo.png or https://..."
                  value={form.logoUrl}
                  onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                  
                />
              </div>

              <div>
                <label >Official Website Link</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={form.websiteUrl}
                  onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                  
                />
              </div>

              <div >
                <div>
                  <label >Partner Tier</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    
                  >
                    <option value="TECHNOLOGY_PARTNER">Technology Partner</option>
                    <option value="CLIENT">Client / Customer</option>
                    <option value="INSTITUTIONAL">Institutional</option>
                  </select>
                </div>
                <div>
                  <label >Sort Priority</label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                    
                  />
                </div>
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
                  Save Logo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
