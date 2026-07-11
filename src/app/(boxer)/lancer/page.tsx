import { Suspense } from 'react';
import { LancerFlow } from '@/components/LancerFlow';
import { getBoxers } from '@/lib/queries';

export default async function LancerPage() {
  const boxers = await getBoxers();
  return (
    <Suspense>
      <LancerFlow boxers={boxers} />
    </Suspense>
  );
}
