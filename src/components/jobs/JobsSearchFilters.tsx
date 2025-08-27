import { Search, MapPin, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function JobsSearchFilters({
  search, setSearch, location, setLocation, jobType, setJobType, handleSearch, loading, duration, setDuration
}: {
  search: string;
  setSearch: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  jobType: string;
  setJobType: (v: string) => void;
  handleSearch: () => void;
  loading: boolean;
  duration: string;
  setDuration: (v: string) => void;
}) {
  return (
    <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50 mb-8">
      <div className="grid md:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
          />
        </div>
        <div className="relative md:max-w-xs w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="appearance-none w-full min-w-[160px] max-w-xs px-4 py-3 pr-10 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white text-left flex items-center justify-between focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
              >
                <span>
                  {jobType
                    ? {
                        "full-time": "Full-time",
                        "part-time": "Part-time",
                        "contract": "Contract",
                        "internship": "Internship",
                      }[jobType] || "Job Type"
                    : "Job Type"}
                </span>
                <ChevronDown className="ml-2 text-zinc-400 pointer-events-none" size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="min-w-[160px] max-w-xs w-full bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg"
              style={{ width: "100%" }}
            >
              <DropdownMenuItem onClick={() => setJobType("")}>Job Type</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setJobType("full-time")}>Full-time</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setJobType("part-time")}>Part-time</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setJobType("contract")}>Contract</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setJobType("internship")}>Internship</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Duration (e.g. 6 months)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
          />
        </div>
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-900/30 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search Jobs'}
        </button>
      </div>
    </div>
  );
}
