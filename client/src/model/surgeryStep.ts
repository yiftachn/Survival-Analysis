export type SurgeryStep = "pre" | "intra" | "post";

export const stepToDisplayName: { [_ in SurgeryStep]: string } = {
    pre: "Preparation",
    intra: "Surgery",
    post: "Post Surgery"
};
