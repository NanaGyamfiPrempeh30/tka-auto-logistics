"use client";

import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateLeadStatus } from "@/app/admin/actions";
import type { LeadStatus } from "@/lib/supabase/types";

const options: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "converted", label: "Converted" },
];

export default function StatusSelect({
  leadId,
  status,
}: {
  leadId: string;
  status: LeadStatus;
}) {
  const [value, setValue] = useState(status);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (next: string) => {
    const nextStatus = next as LeadStatus;
    const previous = value;
    setValue(nextStatus);
    setError(null);

    startTransition(async () => {
      const result = await updateLeadStatus(leadId, nextStatus);
      if (result?.error) {
        setValue(previous);
        setError("Couldn't update status — try again.");
      }
    });
  };

  return (
    <div>
      <Select value={value} onValueChange={handleChange} disabled={isPending}>
        <SelectTrigger className="w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
