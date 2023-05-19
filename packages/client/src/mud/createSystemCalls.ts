import { getComponentValue } from "@latticexyz/recs";
import { awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { playerEntity, worldSend, txReduced$ }: SetupNetworkResult,
  { Position }: ClientComponents
) {
  const spawn = async (x: number, y: number) => {
    const tx = await worldSend("spawn", [x, y]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const move = async (x: number, y: number) => {
    if (!playerEntity) {
      throw new Error("No player");
    }

    const moveId = ":1233434353";
    Position.addOverride(moveId, {
      entity: playerEntity,
      value: { x, y },
    });

    const tx = await worldSend("move", [x, y]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  return {
    spawn,
    move,
  };
}
