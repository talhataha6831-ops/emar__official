import { supabase } from '@/integrations/supabase/client'

interface WhatsAppOrderPayload {
  productId: string
  productName: string
  variantDetails?: string
  price: number
  customerName?: string
  customerPhone?: string
}

export const executeWhatsAppOrder = async (payload: WhatsAppOrderPayload) => {
  const targetPhone = (process.env.NEXT_PUBLIC_EMAR_WHATSAPP_TARGET || '923257851162').replace('+','')
  try{
    await supabase.from('whatsapp_orders').insert({
      product_id: payload.productId,
      product_name: payload.productName,
      variant_details: payload.variantDetails ?? 'Standard',
      price: payload.price,
      customer_name: payload.customerName ?? null,
      customer_phone: payload.customerPhone ?? null,
      status: 'INTENT_CLICKED',
    })
  }catch(err){
    console.error('Supabase insert failed', err)
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const message = [
    '👑 *EMAR LUXURY ORDER INQUIRY*',
    `📌 *Product:* ${payload.productName}`,
    `🏷️ *Variant:* ${payload.variantDetails ?? 'Standard'}`,
    `💰 *Price:* Rs. ${payload.price.toLocaleString()}`,
    `🔗 *Product Link:* ${currentUrl}`,
    '',
    '_Please assist me with instant order confirmation and payment options._'
  ].join('\n')

  const encoded = encodeURIComponent(message)
  const waUrl = `https://wa.me/${targetPhone}?text=${encoded}`

  if(typeof window !== 'undefined'){
    window.open(waUrl, '_blank', 'noopener,noreferrer')
  }
}
