import { TeamsList } from "@/features/teams/components/teams-list.client";

export default function TeamsPage() {
  return (
    <main className="container mx-auto p-6 lg:p-12">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Teams</h1>
        </div>
        <TeamsList />
      </div>
    </main>
  );
}
