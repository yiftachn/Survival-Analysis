import { BehaviorSubject } from "rxjs";
import EnrichPoint from "../common/EnrichedPoint";
import Point from "../common/Point";
import linePoints from "./LineGraphStore";

class GraphStore {
    public static scatterPoints: BehaviorSubject<Point[]> = new BehaviorSubject<Point[]>([]);
    public static enrichedScatterPoints: BehaviorSubject<EnrichPoint[]> = new BehaviorSubject<EnrichPoint[]>([]);
    public static linePoints:Point[] = linePoints;

    public static reset() {
        GraphStore.scatterPoints.next([]);
    }
}

export default GraphStore;