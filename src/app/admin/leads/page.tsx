import { db } from "@/db";
import { leads } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
          Lead Dashboard
        </h1>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Date</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Name</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Mobile</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Business</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {allLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {lead.name || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300">
                      {lead.mobile}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300">
                      {lead.businessType || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                        lead.source === 'modal' 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {lead.source}
                      </span>
                    </td>
                  </tr>
                ))}
                {allLeads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400">
                      No leads found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
