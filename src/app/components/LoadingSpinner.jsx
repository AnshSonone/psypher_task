export default function LoadingSpinner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          
          <div className="h-48 bg-slate-200 dark:bg-slate-700 skeleton"></div>
          
          
          <div className="p-6 space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 skeleton w-1/3"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 skeleton w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 skeleton"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 skeleton w-5/6"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 skeleton w-24 rounded-lg"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 skeleton w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}