import { createClient } from "@supabase/supabase-js";
import { allowRequest } from "@/lib/rateLimit";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!; // server-only secret

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  throw new Error("Supabase URL and service role key must be set in server env");
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false },
});

type Body = {
  productId: string;
  productName: string;
  price: number;
  variantDetails?: string;
  customerName?: string | null;
  customerPhone?: string | null;
  currentUrl?: string | null;
};

export async function POST(req: Request) {
  try {
    // Rate limit per IP
    const xff = req.headers.get("x-forwarded-for") || "";
    const ip = xff.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "127.0.0.1";

    const allowed = allowRequest(ip);
    if (!allowed) {
      return new Response(JSON.stringify({ error: "Too many requests" }), { status: 429 });
    }

    const body: Body = await req.json();

    // Basic validation
    if (!body?.productId || !body?.productName || typeof body.price !== "number") {
      return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400 });
    }

    // Insert intent (server-side service role key, never exposed)
    const { data, error } = await supabaseAdmin
      .from("whatsapp_orders")
      .insert({
        product_id: body.productId,
        product_name: body.productName,
        variant_details: body.variantDetails ?? "Standard",
        price: body.price,
        customer_name: body.customerName ?? null,
        customer_phone: body.customerPhone ?? null,
        status: "INTENT_CLICKED",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error (service):", error);
      // continue — we still return wa.me URL for UX
    }

    // Build WA message and url
    const targetPhone = (process.env.NEXT_PUBLIC_EMAR_WHATSAPP_TARGET || "923257851162").replace("+", "");
    const currentUrl = body.currentUrl ?? "";
    const msg = [
      "👑 *EMAR LUXURY ORDER INQUIRY*",
      `📌 *Product:* ${body.productName}`,
      `🏷️ *Variant:* ${body.variantDetails ?? "Standard"}`,
      `💰 *Price:* Rs. ${body.price.toLocaleString()}`,
      `🔗 *Product Link:* ${currentUrl}`,
      "",
      "_Please assist me with instant order confirmation and payment options._",
    ].join("\n");

    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;

    return new Response(JSON.stringify({ ok: true, waUrl, inserted: data ?? null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("whatsapp-order handler error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
