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
      {/* Avatar */}
      {isCoach && (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-white">
          <Image
            src="/owlgpt.png"
            alt="Coach"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      )}

      {/* Message Bubble */}
      <div className="flex flex-col flex-1 max-w-[80%]">
        <div
          className={`rounded-lg px-3 py-2 ${
            isCoach
              ? "bg-muted text-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
        </span>
      </div>
    </div>
  )
}
