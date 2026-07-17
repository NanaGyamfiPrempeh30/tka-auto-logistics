"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/lib/supabase/types";

const tabs: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "converted", label: "Converted" },
];

const statusStyles: Record<LeadStatus, string> = {
  new: "bg-gold/15 text-gold-deep border-gold/30",
  contacted: "bg-ink/10 text-ink border-ink/20",
  converted: "bg-green-600/10 text-green-700 border-green-600/20",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LeadsInbox({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<LeadStatus | "all">("all");

  const filtered = useMemo(
    () => (tab === "all" ? leads : leads.filter((lead) => lead.status === tab)),
    [leads, tab]
  );

  return (
    <Tabs value={tab} onValueChange={(v) => setTab(v as LeadStatus | "all")}>
      <TabsList>
        {tabs.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>
            {t.label}
            <span className="ml-1.5 text-xs text-ink/40">
              ({t.value === "all" ? leads.length : leads.filter((l) => l.status === t.value).length})
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="mt-4 overflow-hidden rounded-md border border-line bg-paper">
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-ink/50">No leads in this view.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Vehicle interest</TableHead>
                <TableHead>Ghana city</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/admin/leads/${lead.id}`)}
                >
                  <TableCell className="font-medium text-ink">{lead.name}</TableCell>
                  <TableCell className="text-ink/70">{lead.contact}</TableCell>
                  <TableCell className="text-ink/70">{lead.vehicle_interest}</TableCell>
                  <TableCell className="text-ink/70">{lead.ghana_city}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("capitalize", statusStyles[lead.status])}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-ink/50">{formatDate(lead.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Tabs>
  );
}
