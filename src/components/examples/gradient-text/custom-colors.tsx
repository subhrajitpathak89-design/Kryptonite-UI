import { GradientText } from '@/components/kryptonite'

export function GradientTextCustomColors() {
  return (
    <div className="flex flex-col items-center gap-2 text-4xl font-bold tracking-tight">
      <GradientText colors={['#f97316', '#facc15', '#ef4444']}>Sunset</GradientText>
      <GradientText colors={['#2de2e6', '#3b82f6']} speed={3}>Ocean</GradientText>
      <GradientText colors={['#ec4899', '#8b5cf6']} animate={false}>Static</GradientText>
    </div>
  )
}
