"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Search, Edit2, Trash2, CheckCircle2, XCircle, SlidersHorizontal, RefreshCw } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Form State
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    category: "ev-charging",
    categoryLabel: "EV Charging",
    price: "",
    originalPrice: "",
    stockQuantity: "10",
    inStock: true,
    warranty: "3 Years Comprehensive Warranty",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
    badge: "",
    isPublished: true,
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.products) setProducts(data.products);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      tagline: "",
      category: "ev-charging",
      categoryLabel: "EV Charging",
      price: "",
      originalPrice: "",
      stockQuantity: "10",
      inStock: true,
      warranty: "3 Years Comprehensive Warranty",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
      badge: "",
      isPublished: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingProduct(p);
    setForm({
      name: p.name,
      tagline: p.tagline,
      category: p.category,
      categoryLabel: p.categoryLabel,
      price: p.price.toString(),
      originalPrice: p.originalPrice ? p.originalPrice.toString() : "",
      stockQuantity: p.stockQuantity.toString(),
      inStock: p.inStock,
      warranty: p.warranty,
      image: p.image,
      badge: p.badge || "",
      isPublished: p.isPublished,
    });
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // Edit
        await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        // Create
        await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setModalOpen(false);
      fetchProducts();
    } catch (e) {
      alert("Failed to save product");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (e) {
      alert("Failed to delete product");
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div >
      {/* Header Actions */}
      <div >
        <div>
          <h2 >E-Commerce Products & Catalogue</h2>
          <p >Manage EV chargers, lithium battery packs, solar inverters</p>
        </div>
        <button
          onClick={openAddModal}
          
        >
          <Plus  />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div >
        <div >
          <Search  />
          <input
            type="text"
            placeholder="Search products by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            
          />
        </div>

        <div >
          {[
            { id: "all", label: "All Items" },
            { id: "ev-charging", label: "EV Chargers" },
            { id: "battery-storage", label: "Lithium Batteries" },
            { id: "power-solar", label: "Solar Inverters" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Table */}
      <div >
        <div >
          <table >
            <thead>
              <tr >
                <th >Product</th>
                <th >Category</th>
                <th >Price (INR)</th>
                <th >Stock</th>
                <th >Status</th>
                <th >Actions</th>
              </tr>
            </thead>
            <tbody >
              {loading ? (
                <tr>
                  <td colSpan={6} >
                    Loading catalog items...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} >
                    No products found matching filters.
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => (
                  <tr key={prod.id} >
                    <td >
                      <div >
                        <div >
                          <Image src={prod.image} alt={prod.name} fill  />
                        </div>
                        <div>
                          <div >{prod.name}</div>
                          <div >{prod.tagline}</div>
                        </div>
                      </div>
                    </td>
                    <td >
                      <span >
                        {prod.categoryLabel}
                      </span>
                    </td>
                    <td >
                      ₹{prod.price.toLocaleString("en-IN")}
                      {prod.originalPrice && (
                        <div >
                          ₹{prod.originalPrice.toLocaleString("en-IN")}
                        </div>
                      )}
                    </td>
                    <td >
                      {prod.inStock ? (
                        <span >{prod.stockQuantity} in stock</span>
                      ) : (
                        <span >Out of Stock</span>
                      )}
                    </td>
                    <td >
                      {prod.isPublished ? (
                        <span >
                          <CheckCircle2  /> Published
                        </span>
                      ) : (
                        <span >
                          <XCircle  /> Draft
                        </span>
                      )}
                    </td>
                    <td >
                      <div >
                        <button
                          onClick={() => openEditModal(prod)}
                          
                          title="Edit"
                        >
                          <Edit2  />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          
                          title="Delete"
                        >
                          <Trash2  />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CREATE / EDIT PRODUCT MODAL ── */}
      {modalOpen && (
        <div >
          <div  onClick={() => setModalOpen(false)} />
          <div >
            <h3 >
              {editingProduct ? "Edit Product Details" : "Add New Clean Energy Hardware"}
            </h3>

            <form onSubmit={handleFormSubmit} >
              <div>
                <label >Product Title *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. VLOXIA Smart Home Wallbox 11 kW"
                  
                />
              </div>

              <div>
                <label >Short Tagline</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="Compact fast charger with app scheduling..."
                  
                />
              </div>

              <div >
                <div>
                  <label >Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => {
                      const val = e.target.value;
                      let label = "EV Charging";
                      if (val === "battery-storage") label = "Lithium Storage";
                      if (val === "power-solar") label = "Power & Solar";
                      setForm({ ...form, category: val, categoryLabel: label });
                    }}
                    
                  >
                    <option value="ev-charging">EV Charging</option>
                    <option value="battery-storage">Lithium Storage</option>
                    <option value="power-solar">Power & Solar</option>
                  </select>
                </div>
                <div>
                  <label >Badge (Optional)</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="e.g. Best Seller / New"
                    
                  />
                </div>
              </div>

              <div >
                <div>
                  <label >Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="38500"
                    
                  />
                </div>
                <div>
                  <label >MRP / Original (₹)</label>
                  <input
                    type="number"
                    value={form.originalPrice}
                    onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                    placeholder="45000"
                    
                  />
                </div>
                <div>
                  <label >Stock Qty</label>
                  <input
                    type="number"
                    value={form.stockQuantity}
                    onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
                    
                  />
                </div>
              </div>

              <div>
                <label >Product Photo URL *</label>
                <input
                  type="url"
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  
                />
              </div>

              <div>
                <label >Warranty Term</label>
                <input
                  type="text"
                  value={form.warranty}
                  onChange={(e) => setForm({ ...form, warranty: e.target.value })}
                  placeholder="e.g. 5 Years Replacement Warranty"
                  
                />
              </div>

              <div >
                <label >
                  <input
                    type="checkbox"
                    checked={form.inStock}
                    onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                    
                  />
                  <span>Mark as In Stock</span>
                </label>
                <label >
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                    
                  />
                  <span>Publish on Storefront</span>
                </label>
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
                  {editingProduct ? "Update Product" : "Save & Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
