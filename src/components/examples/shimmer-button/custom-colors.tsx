import { ShimmerButton } from '@/components/kryptonite'

export function ShimmerButtonCustomColors() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <ShimmerButton color="#ff3d81" shineColor="#ffd1e2" textColor="#ffffff">Buy now</ShimmerButton>
      <ShimmerButton color="#8b5cf6" shineColor="#e4d8ff" textColor="#ffffff" speed={1.5}>Faster</ShimmerButton>
      <ShimmerButton color="#f5f5f5" shineColor="#ffffff" glow={false}>No glow</ShimmerButton>
    </div>
  )
}
