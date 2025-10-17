import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import type { ChatMessage } from "./types"

interface MessageProps {
  message: ChatMessage
}

export function Message({ message }: MessageProps) {
  const isCoach = message.role === "coach"

  return (
    <div className={`flex gap-2 ${isCoach ? "flex-row" : "flex-row-reverse"}`}>
      {isCoach && (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-white shadow-sm border border-border">
          <Image src="/owlgpt.png" alt="Coach" width={32} height={32} className="object-cover" />
        </div>
      )}

      <div className="flex flex-col flex-1 max-w-full">
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm border ${
            isCoach ? "bg-white text-foreground" : "bg-primary text-primary-foreground"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
        </div>

        <span className={`text-[11px] mt-1 ${isCoach ? "text-muted-foreground" : "text-primary/80"}`}>
          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
        </span>
      </div>
    </div>
  )
}
