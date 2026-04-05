// Branded skeleton shown while BelowFold chunk downloads.
// Matches the color + rhythm of the first few sections so the transition feels
// natural instead of a white flash.
export default function BelowFoldSkeleton() {
  return (
    <div aria-hidden="true" className="relative">
      {/* Trust strip placeholder (white, matches TrustedBy) */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-3 w-48 mx-auto mb-10 rounded bg-gray-200 skeleton-shimmer" />
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20 md:gap-y-10">
            {[28, 28, 28, 24, 10, 28].map((w, i) => (
              <div
                key={i}
                className="h-8 rounded bg-gray-100 skeleton-shimmer"
                style={{ width: `${w * 4}px` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial placeholder (dark, matches Testimonial) */}
      <div
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0d2240 0%, #0a1a30 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-3 w-36 mx-auto mb-16 rounded bg-white/10 skeleton-shimmer-dark" />
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border border-white/[0.08]"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="space-y-3 mb-6">
                  <div className="h-3 rounded bg-white/10 skeleton-shimmer-dark" />
                  <div className="h-3 rounded bg-white/10 skeleton-shimmer-dark w-5/6" />
                  <div className="h-3 rounded bg-white/10 skeleton-shimmer-dark w-11/12" />
                  <div className="h-3 rounded bg-white/10 skeleton-shimmer-dark w-3/4" />
                </div>
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-20 rounded bg-white/10 skeleton-shimmer-dark" />
                    <div className="h-2 w-28 rounded bg-white/10 skeleton-shimmer-dark" />
                  </div>
                  <div className="h-6 w-20 rounded-md bg-white/10 skeleton-shimmer-dark" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
