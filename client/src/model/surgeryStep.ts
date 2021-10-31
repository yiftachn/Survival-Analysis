export type SurgeryStep = "preparation" | "surgery" | "postSurgery";

export const stepToDisplayName: { [key in SurgeryStep]: string } = {
    preparation: "Preparation",
    surgery: "Surgery",
    postSurgery: "Post Surgery",
};
