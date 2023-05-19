import {
  useComponentValue,
  useEntityQuery,
  useRow,
  useRows,
} from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { Has, getComponentValueStrict } from "@latticexyz/recs";
import { getPlayerEntity } from "@latticexyz/std-client";

export const App = () => {
  const {
    components: { Player, Position },
    systemCalls: { move, spawn },
    network: { storeCache, playerEntity },
  } = useMUD();

  const playerExists = useComponentValue(Player, playerEntity)?.value;
  const playerPosition = useComponentValue(Position, playerEntity);

  console.log(playerExists, playerPosition);

  if (!playerExists || !playerPosition)
    return (
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("spawn:", await spawn(1, 1));
        }}
      >
        Spawn
      </button>
    );

  return (
    <>
      <>
        <p>
          {playerEntity} is at position{" "}
          {`(${playerPosition.x}, ${playerPosition.y})`}
        </p>
        <button
          onClick={async (event) => {
            event.preventDefault();
            console.log(
              "move:",
              await move(playerPosition.x, playerPosition.y - 1)
            );
          }}
        >
          up
        </button>
        <button
          onClick={async (event) => {
            event.preventDefault();
            console.log(
              "move:",
              await move(playerPosition.x, playerPosition.y + 1)
            );
          }}
        >
          down
        </button>
        <button
          onClick={async (event) => {
            event.preventDefault();
            console.log(
              "move:",
              await move(playerPosition.x - 1, playerPosition.y)
            );
          }}
        >
          left
        </button>
        <button
          onClick={async (event) => {
            event.preventDefault();
            console.log(
              "move:",
              await move(playerPosition.x - 1, playerPosition.y)
            );
          }}
        >
          right
        </button>
      </>
    </>
  );
};
