import { BoxeursSearch } from '@/components/BoxeursSearch';
import { getBoxers } from '@/lib/queries';
import { DEMO_ME } from '@/lib/current-user';

export default async function BoxeursPage() {
  const boxers = await getBoxers();
  return <BoxeursSearch boxers={boxers} meId={DEMO_ME} />;
}
