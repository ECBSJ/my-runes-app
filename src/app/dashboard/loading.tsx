import { Skeleton } from "@/components/ui/skeleton"

function SkeletonCard() {
  return (
    <main className="flex h-[968px] items-start justify-center gap-4 p-24">
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[250px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-10/12" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[250px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-10/12" />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[250px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-10/12" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[250px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-10/12" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default function Loading() {
  return <SkeletonCard />
}
