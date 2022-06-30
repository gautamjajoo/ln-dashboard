import { GetInfoNode, ListFunds } from "../model/CoreLN";
import { MetricsOne } from "../model/Metrics";
import { Offer } from "../model/Offer";
import AppAPI from "./AppAPI";

/**
 * API implementation that use the Rest Protocol and the plugin jrest
 * to communicate with the APP.
 *
 * TODO: feel the method call with all the API that are inside the pages module
 * and feel use this class to call the method inside the pages modules.
 */
export default class JRestAPI implements AppAPI {
  getInfo(): GetInfoNode {
    throw new Error("Method not implemented.");
  }
  listFunds(): ListFunds {
    throw new Error("Method not implemented.");
  }
  offer(): Offer {
    throw new Error("Method not implemented.");
  }
  getMetricOne(network: string, nodeId: string): MetricsOne | undefined {
    throw new Error("Method not implemented.");
  }
}
