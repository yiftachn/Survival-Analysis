export type SurgeryStep = "pre" | "intra" | "post";

export const stepToDisplayName: { [_ in SurgeryStep]: string } = {
    pre: "Pre Surgery",
    intra: "Surgery",
    post: "Post Surgery"
};
