"use client";

import React, { useState, useEffect } from "react";
import { Inbox, Phone, Mail, MessageSquare, Download, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      if (data.inquiries) setInquiries(data.inquiries);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      fetchInquiries();
    } catch (e) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this lead?")) return;
    try {
      await fetch("/api/inquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchInquiries();
    } catch (e) {
      alert("Failed to delete lead");
    }
  };

  const exportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ["Full Name", "Phone", "Email", "Solution", "Type", "City", "Message", "Status", "Date"];
    const rows = inquiries.map((i) => [
      `"${i.fullName}"`,
      `"${i.phone}"`,
      `"${i.email || ""}"`,
      `"${i.solution || ""}"`,
      `"${i.type || ""}"`,
      `"${i.city || ""}"`,
      `"${(i.message || "").replace(/"/g, '""')}"`,
      `"${i.status}"`,
      `"${new Date(i.createdAt).toLocaleDateString()}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vloxia_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = inquiries.filter((inq) => {
    if (typeFilter === "all") return true;
    return inq.type === typeFilter;
  });

  return (
    <div >
      <div >
        <div>
          <h2 >Customer Inquiries & Partner Leads</h2>
          <p >Track and respond to quotations, general enquiries and dealer requests</p>
        </div>
        <button
          onClick={exportCSV}
          
        >
          <Download  />
          <span>Export CSV / Excel</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div >
        {[
          { id: "all", label: "All Inquiries" },
          { id: "QUOTE", label: "Quotation Requests" },
          { id: "GENERAL", label: "General Contact" },
          { id: "PARTNER", label: "Channel Partners" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTypeFilter(tab.id)}
            
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div >
        <div >
          <table >
            <thead>
              <tr >
                <th >Contact</th>
                <th >Solution / Segment</th>
                <th >Requirement / Message</th>
                <th >Lead Status</th>
                <th >Quick Connect</th>
                <th >Action</th>
              </tr>
            </thead>
            <tbody >
              {loading ? (
                <tr>
                  <td colSpan={6} >Loading leads...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} >No inquiry records found.</td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr key={inq.id} >
                    <td >
                      <div >{inq.fullName}</div>
                      {inq.companyName && <div >{inq.companyName}</div>}
                      <div >{inq.phone}</div>
                      <div >{inq.city || "Not specified"}</div>
                    </td>
                    <td >
                      <span >
                        {inq.solution || inq.type}
                      </span>
                      {inq.customerType && <div >{inq.customerType}</div>}
                    </td>
                    <td >
                      <p >{inq.message}</p>
                    </td>
                    <td >
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        
                      >
                        <option value="NEW">New</option>
                        <option value="IN_REVIEW">In Discussion</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="CLOSED">Won / Closed</option>
                      </select>
                    </td>
                    <td >
                      <div >
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          title="WhatsApp Chat"
                          
                        >
                          <MessageSquare  />
                        </a>
                        <a
                          href={`tel:${inq.phone}`}
                          title="Call"
                          
                        >
                          <Phone  />
                        </a>
                      </div>
                    </td>
                    <td >
                      <button
                        onClick={() => handleDelete(inq.id)}
                        
                        title="Delete Lead"
                      >
                        <Trash2  />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
