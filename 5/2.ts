import inputStrings from "../util/load.ts";
import { seatId } from "./1.ts";

const lines = await inputStrings(5);
const ids = lines.map(seatId);
ids.sort();
console.log(ids.find((id, i) => i && id !== ids[i - 1] + 1)! - 1);
