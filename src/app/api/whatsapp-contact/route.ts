import { createClient } from '@supabase/supabase-js'
import { allowRequest } from '@/lib/rateLimit'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  throw new Error('Supabase URL and service role key must be set in server env')
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false },
})

export async function POST(req: Request) {
  try {
    const xff = req.headers.get('x-forwarded-for') || ''
    const ip = xff.split(',')[0]?.trim() || req.headers.get('x-real-ip') || '127.0.0.1'
    const allowed = allowRequest(ip)
    if(!allowed){
      return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 })
    }

    const body = await req.json()
    const type = body?.type
    if(!type) return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 })

    // Insert as a concierge intent
    const productName = type === 'order' ? 'VIP_DIRECT_ORDER' : 'VIP_CONCIERGE_CARE'
    const { data, error } = await supabaseAdmin.from('whatsapp_orders').insert({
      product_id: null,
      product_name: productName,
      variant_details: type,
      price: 0,
      customer_name: null,
      customer_phone: null,
      status: 'INTENT_CLICKED'
    }).select().single()

    if(error) console.error('concierge insert error', error)

    const targetPhone = type === 'order' ? (process.env.NEXT_PUBLIC_EMAR_WHATSAPP_TARGET || '923257851162') : (process.env.NEXT_PUBLIC_EMAR_VIP_WHATSAPP || '923258581251')
    const message = type === 'order' ? '👑 EMAR VIP - Customer requests direct order assistance' : '👑 EMAR VIP - Concierge care request'
    const waUrl = `https://wa.me/${String(targetPhone).replace('+','')}?text=${encodeURIComponent(message)}`

    return new Response(JSON.stringify({ ok: true, waUrl, inserted: data ?? null }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch(err){
    console.error('whatsapp-contact handler error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 })
  }
}
