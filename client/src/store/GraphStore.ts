import { BehaviorSubject } from "rxjs";
import Point from "../common/Point";

class GraphStore {
    public static scatterPoints: BehaviorSubject<Point[]> = new BehaviorSubject<Point[]>([]);
    public static linePoints: BehaviorSubject<Point[]> = new BehaviorSubject<Point[]>([]);

    public static reset() {
        GraphStore.scatterPoints.next([]);
        GraphStore.linePoints.next([]);
    }
}

export default GraphStore;