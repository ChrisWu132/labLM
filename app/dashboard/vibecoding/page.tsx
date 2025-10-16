import { ModuleHeader } from "@/components/shared/module-header"
import { startVibecoding, getModuleProgress, getLabSubmissions } from "./actions"
import { VibeCodingClient } from "./vibecoding-client"
import { MODULES } from "@/lib/constants"

export default async function VibeCodingPage() {
  // Initialize module progress
  await startVibecoding()

  // Fetch current progress
  const progressResult = await getModuleProgress(2)
  const moduleProgress = progressResult.data

  // Fetch completed labs
  const labsResult = await getLabSubmissions()
  const completedLabNumbers =
    labsResult.data?.filter((sub) => sub.completed).map((sub) => sub.lab_number) || []

  const vibecodingModule = MODULES.find((m) => m.number === 2)

  return <VibeCodingClient completedLabNumbers={completedLabNumbers} />
}
