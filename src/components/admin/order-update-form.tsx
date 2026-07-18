"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postOrderUpdate } from "@/app/admin/orders/actions";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderStages } from "@/lib/order-stages";
import type { OrderStage } from "@/lib/supabase/types";

export default function OrderUpdateForm({
  orderId,
  currentStage,
}: {
  orderId: string;
  currentStage: OrderStage;
}) {
  const router = useRouter();
  const [stage, setStage] = useState<OrderStage>(currentStage);
  const [note, setNote] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const photoUrls: string[] = [];

    for (const file of files) {
      const path = `${orderId}/${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("order-photos")
        .upload(path, file);

      if (uploadError) {
        setSubmitting(false);
        setError("Couldn't upload one of the photos — try again.");
        return;
      }

      const { data } = supabase.storage.from("order-photos").getPublicUrl(path);
      photoUrls.push(data.publicUrl);
    }

    const result = await postOrderUpdate({ orderId, stage, note, photoUrls });
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setNote("");
    setFiles([]);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label>Stage</Label>
        <Select value={stage} onValueChange={(v) => setStage(v as OrderStage)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {orderStages.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="note">Note</Label>
        <Textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What changed at this stage?"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="photos">Photos</Label>
        <input
          id="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          className="block w-full text-sm text-ink/70 file:mr-3 file:rounded-md file:border file:border-input file:bg-transparent file:px-3 file:py-1.5 file:text-sm file:font-medium"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={submitting}>
        {submitting ? "Posting…" : "Post update"}
      </Button>
    </form>
  );
}
