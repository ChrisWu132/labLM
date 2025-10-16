import { startOrientation } from "./actions"
import { OrientationWelcome } from "@/components/features/orientation/orientation-welcome"
import { getSupabaseServer } from "@/lib/supabase-server"

export default async function OrientationPage() {
  // Initialize orientation progress on page load
  await startOrientation()

  // Get user info from Supabase
  const supabase = await getSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Determine user's display name with fallback logic
  const userName =
    user?.user_metadata?.full_name ||
    (user?.email ? user.email.split("@")[0] : null) ||
    "Friend"

  return <OrientationWelcome userName={userName} />
}
