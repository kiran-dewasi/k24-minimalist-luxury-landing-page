import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PREORDER_PRICE_ID = "price_1SgKSXGwORl8zHTKu3etonMA";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userEmail, userId } = body;

    const origin = request.headers.get("origin") || request.headers.get("referer")?.replace(/\/$/, "") || "https://example.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: PREORDER_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${origin}?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}?status=cancel`,
      customer_email: userEmail || undefined,
      metadata: {
        userId: userId || "",
        type: "preorder",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout session error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create checkout session", details: message },
      { status: 500 }
    );
  }
}
