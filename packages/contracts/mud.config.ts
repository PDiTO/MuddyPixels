import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Player: { keySchema: { owner: "address" }, schema: "bool" },
    Position: {
      keySchema: { owner: "address" },
      schema: { x: "int32", y: "int32" },
    },
  },
});
