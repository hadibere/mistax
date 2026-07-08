import { Suspense } from 'react';
import { LancerFlow } from '@/components/LancerFlow';

export default function LancerPage() {
  return (
    <Suspense>
      <LancerFlow />
    </Suspense>
  );
}
