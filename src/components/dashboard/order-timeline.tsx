import { Badge } from "@/components/ui/badge";
import { orderStageLabels, orderStageStyles } from "@/lib/order-stages";
import { cn } from "@/lib/utils";
import type { OrderUpdate } from "@/lib/supabase/types";

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function OrderTimeline({ updates }: { updates: OrderUpdate[] }) {
  if (updates.length === 0) {
    return (
      <p className="text-sm text-ink/50">No status updates posted yet.</p>
    );
  }

  return (
    <ol className="space-y-6">
      {updates.map((update) => (
        <li key={update.id} className="border-l-2 border-line pl-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={cn(orderStageStyles[update.stage])}>
              {orderStageLabels[update.stage]}
            </Badge>
            <span className="text-xs text-ink/50">{formatDateTime(update.created_at)}</span>
          </div>

          {update.note && <p className="mt-2 text-sm text-ink/80">{update.note}</p>}

          {update.photo_urls.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {update.photo_urls.map((url) => (
                <a key={url} href={url} target="_blank" rel="noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt="Shipment progress photo"
                    className="h-20 w-20 rounded-md border border-line object-cover"
                  />
                </a>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
