import Container from "@/components/ui/container";
import { auctionSources } from "@/lib/constants";

export default function TrustBar() {
  return (
    <div className="bg-paper-dim border-y border-line py-6">
      <Container>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
            We buy from
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {auctionSources.map((source) => (
              <li
                key={source}
                className="font-heading text-lg sm:text-xl font-semibold uppercase tracking-wide text-ink/70"
              >
                {source}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
