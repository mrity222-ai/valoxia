import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret || keySecret.includes("Mock")) {
      // Mock mode: Allow verification for demonstration/testing & record order
      try {
        const orderIdNumber = `VLX-${Date.now().toString().slice(-6)}`;
        await prisma.order.create({
          data: {
            orderNumber: orderIdNumber,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id || `pay_mock_${Date.now()}`,
            customerName: body.orderDetails?.customer?.name || "Customer",
            customerPhone: body.orderDetails?.customer?.phone || "+91 9800000000",
            customerEmail: body.orderDetails?.customer?.email || null,
            customerCity: body.orderDetails?.customer?.city || "Delhi NCR",
            totalAmount: Number(body.orderDetails?.total || 38500),
            paymentStatus: "PAID",
            fulfillmentStatus: "PROCESSING",
            itemsSnapshotJson: JSON.stringify(body.orderDetails?.items || []),
          },
        });
      } catch (dbErr) {
        console.error("Failed to persist mock order:", dbErr);
      }

      return NextResponse.json({
        success: true,
        message: "Payment successfully verified (Mock Test Environment)",
      });
    }

    // Official Razorpay Signature Verification algorithm
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      // Record completed purchase order in database
      try {
        const orderIdNumber = `VLX-${Date.now().toString().slice(-6)}`;
        await prisma.order.create({
          data: {
            orderNumber: orderIdNumber,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            customerName: orderDetails?.customer?.name || "Customer",
            customerPhone: orderDetails?.customer?.phone || "",
            customerEmail: orderDetails?.customer?.email || null,
            customerCity: orderDetails?.customer?.city || null,
            totalAmount: Number(orderDetails?.total || 0),
            paymentStatus: "PAID",
            fulfillmentStatus: "PROCESSING",
            itemsSnapshotJson: JSON.stringify(orderDetails?.items || []),
          },
        });
      } catch (dbErr) {
        console.error("Failed to persist order to database:", dbErr);
      }

      return NextResponse.json({
        success: true,
        message: "Payment signature verified successfully",
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Razorpay verification error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
