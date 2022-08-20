import { container } from "tsyringe";
import AppAPI from "./AppAPI";
import LNSocketAPI from "./LNSocketAPI";
import MockAPI from "./MockAPI";

export default class APIProvider {
  private static instance: AppAPI;

  private constructor() {}

  private static buildAPI(): AppAPI {
    if (process.env.NEXT_NODE_ID != null) {
      let nodeID = process.env.NEXT_NODE_ID!;
      let addr = process.env.NEXT_ADDR!;
      let rune = process.env.NEXT_RUNE!;
      let lambda = process.env.NEXT_LAMBDA;
      let lnmetrics_url = process.env.NEXT_LNMETRICS_URL;
      container.register("nodeID", { useValue: nodeID });
      container.register("address", { useValue: addr });
      container.register("rune", { useValue: rune });
      container.register("lambda", { useValue: lambda });
      container.register("lnmetrics_url", { useValue: lnmetrics_url });
      return container.resolve(LNSocketAPI);
    }
    return container.resolve(MockAPI);
  }

  public static api(): AppAPI {
    if (!APIProvider.instance) {
      APIProvider.instance = APIProvider.buildAPI();
    }
    return APIProvider.instance;
  }
}
