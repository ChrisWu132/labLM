import { startVibecoding } from "./actions"
import { VibeCodingClient } from "./vibecoding-client"

export default async function VibeCodingPage() {
  // Initialize module progress
  await startVibecoding()

  return <VibeCodingClient />
}
