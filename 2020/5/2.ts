import puzzle from '../../util/puzzle.ts';
import { seatId } from './1.ts';

const ids = await puzzle(import.meta).map(seatId);
ids.sort();
console.log(ids.find((id, i) => i && id !== ids[i - 1] + 1)! - 1);
