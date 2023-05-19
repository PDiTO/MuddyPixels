// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Position, Player } from "../codegen/Tables.sol";

contract PlayerSystem is System {

  function spawn(int32 x, int32 y) public {
    require(!Player.get(_msgSender()), "Already spawned");
    Player.set(_msgSender(), true);
    Position.set(_msgSender(), x, y);
  }

  function move(int32 x, int32 y) public {
    require(Player.get(_msgSender()), "No player");
    Position.set(_msgSender(), x, y);
  }
}
