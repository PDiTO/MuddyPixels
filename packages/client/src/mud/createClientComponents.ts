import { overridableComponent } from "@latticexyz/recs";
import { SetupNetworkResult } from "./setupNetwork";

export type ClientComponents = ReturnType<typeof createClientComponents>;

export function createClientComponents({ components }: SetupNetworkResult) {
  return {
    ...components,
    Position: overridableComponent(components.Position),
    // add your client components or overrides here
  };
}
