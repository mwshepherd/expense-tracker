import { ArrowPathIcon } from '@heroicons/react/24/outline'

export const Loader = () => (
  <div className="h-[calc(100vh_-_254px)] flex flex-col items-center justify-center gap-4">
    <p className="text-gray-500 uppercase font-italic">Loading...</p>

    <div className="animate-spin w-8 h-8 rounded-full">
      <ArrowPathIcon className="text-gray-500" />
    </div>
  </div>
)
