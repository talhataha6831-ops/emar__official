export interface WhatsAppOrderPayload {
  productId: string;
  productName: string;
  variantDetails?: string;
  price: number;
  customerName?: string;
  customerPhone?: string;
}

export const executeWhatsAppOrder = async (payload: WhatsAppOrderPayload) => {
  try {
    const body = { ...payload, currentUrl: typeof window !== "undefined" ? window.location.href : "" };
    const res = await fetch("/api/whatsapp-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    if (!res.ok || !json?.waUrl) {
      console.warn("Server-side whatsapp-order may have failed:", json);
      const fallbackPhone = (process.env.NEXT_PUBLIC_EMAR_WHATSAPP_TARGET || "923257851162").replace("+", "");
      if (typeof window !== "undefined") {
        window.open(`https://wa.me/${fallbackPhone}`, "_blank", "noopener,noreferrer");
      }
      return;
    }

    if (typeof window !== "undefined") {
      window.open(json.waUrl, "_blank", "noopener,noreferrer");
    }
  } catch (err) {
    console.error("executeWhatsAppOrder failed:", err);
    const fallbackPhone = (process.env.NEXT_PUBLIC_EMAR_WHATSAPP_TARGET || "923257851162").replace("+", "");
    if (typeof window !== "undefined") {
      window.open(`https://wa.me/${fallbackPhone}`, "_blank", "noopener,noreferrer");
    }
  }
};
