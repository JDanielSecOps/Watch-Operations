
import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/updatesession'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: ["/About","/Dashboard","/Logs/:paths*","/Alerts","/Logs"],
}

