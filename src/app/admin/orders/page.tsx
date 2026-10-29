"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Eye, Search, CheckCircle2, Truck, Clock, XCircle, FileText } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setStatusUpdating(true);
    try {
      await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, fulfillmentStatus: newStatus }),
      });
      fetchOrders();
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, fulfillmentStatus: newStatus });
      }
    } catch (e) {
      alert("Failed to update status");
    } finally {
      setStatusUpdating(false);
    }
  };

  return (
    <div >
      <div>
        <h2 >E-Commerce Orders & Transactions</h2>
        <p >Track and fulfill clean energy hardware purchases</p>
      </div>

      <div >
        <div >
          <table >
            <thead>
              <tr >
                <th >Order ID</th>
                <th >Customer</th>
                <th >Amount</th>
                <th >Payment</th>
                <th >Fulfillment</th>
                <th >Date</th>
                <th >Action</th>
              </tr>
            </thead>
            <tbody >
              {loading ? (
                <tr>
                  <td colSpan={7} >
                    Loading customer orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} >
                    No orders recorded yet.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id} >
                    <td >{ord.orderNumber}</td>
                    <td >
                      <div >{ord.customerName}</div>
                      <div >{ord.customerPhone}</div>
                    </td>
                    <td >
                      ₹{ord.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td >
                      <span >
                        <CheckCircle2  /> {ord.paymentStatus}
                      </span>
                    </td>
                    <td >
                      <select
                        value={ord.fulfillmentStatus}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        
                      >
                        <option value="PROCESSING">Processing</option>
                        <option value="DISPATCHED">Dispatched</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td >
                      {new Date(ord.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td >
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        
                        title="View Order Details"
                      >
                        <Eye  />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ORDER DETAILS MODAL ── */}
      {selectedOrder && (
        <div >
          <div  onClick={() => setSelectedOrder(null)} />
          <div >
            <div >
              <div>
                <h3 >Order #{selectedOrder.orderNumber}</h3>
                <p >
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
              <button onClick={() => setSelectedOrder(null)} >
                ✕
              </button>
            </div>

            <div >
              <div >Customer Details:</div>
              <div>Name: <span >{selectedOrder.customerName}</span></div>
              <div>Phone: <span >{selectedOrder.customerPhone}</span></div>
              {selectedOrder.customerEmail && <div>Email: <span>{selectedOrder.customerEmail}</span></div>}
              {selectedOrder.customerCity && <div>Delivery Location: <span>{selectedOrder.customerCity}</span></div>}
            </div>

            <div >
              <div >Razorpay Gateway Record:</div>
              <div>Payment ID: <span>{selectedOrder.razorpayPaymentId || "Mock / Test"}</span></div>
              <div>Order Reference: <span>{selectedOrder.razorpayOrderId || "Direct API"}</span></div>
              <div >
                Grand Total: ₹{selectedOrder.totalAmount.toLocaleString("en-IN")}
              </div>
            </div>

            <div >
              <button
                onClick={() => setSelectedOrder(null)}
                
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
