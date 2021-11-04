import EnrichPoint from "../common/EnrichedPoint";
import Point from "../common/Point";
import GraphStore from "../store/GraphStore";

class GraphEnricher {
    private static instance: GraphEnricher;

    private constructor() {
        GraphEnricher.instance = this;
    }

    public static getInstance(): GraphEnricher {
        if (!GraphEnricher.instance) {
            GraphEnricher.instance = new GraphEnricher()
        }

        return GraphEnricher.instance;
    }

    public getEnrichedSctterPoints = (scatterPoints: Point[]): EnrichPoint[] => {
        const precentagePoints: Point[] = scatterPoints.map((point) => ({
            x: point.x,
            y: point.y * 100
        }));

        return precentagePoints.map(scatterPoint => {
            const pointOffset = this.calculateOffset(scatterPoint);

            return {
                x: scatterPoint.x,
                y: scatterPoint.y,
                description: this.getPointDescription(pointOffset)
            }
        })
    };

    private calculateOffset = (scateterPoint: Point): number => {
        const orderedLineGraphPoints = GraphStore.linePoints.sort((a, b) => a.x - b.x);
        const closestPoint = orderedLineGraphPoints.reverse().find(e => e.x <= scateterPoint.x);

        if (closestPoint !== undefined) {
            return scateterPoint.y - closestPoint.y;
        }

        return 0;
    }

    private getPointDescription = (pointOffset: number): string => {
        return `${(Math.abs(pointOffset)).toFixed(2)}% ${(pointOffset >= 0) ? "Above average" : "Below average"}`;
    }

}

export default GraphEnricher;