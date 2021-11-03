import FeatureDetails from "./featureDetails";
import { FloatValidator, AgeValidator, WeightValidator } from "./validators";

export const preperationFeatures = ["age", "gender", "weight", "height", "BMI", "DM",
    "HTN", "Renal", "IHD", "COPD", "obesity", "Cva", "asa", "Tumor_origin"] as const;

export const surgeryFeatures = ["obesity", "extra_peritoneal___none", "extra_peritoneal___rplnd", "extra_peritoneal___pelvis",
    "anastomosis___sb_sb", "anastomosis___sb_colon", "resections___sb", "resections___parietal_peritonectomy",
    "resections___pelvic_peritonectomy", "resections___ruq", "resections___ileostomy", "resections___appendix",
    "LUQ", "Pelvic", "RLQ", "Upper Jej", "Low Jej", "Upper ileum", "PCI", "Pelvic Peritonectomy"] as const;

export const postSurgeryFeatures = ["extra_peritoneal___none", "anastomosis___sb_sb", "resections___sb",
    "resections___parietal_peritonectomy", "resections___pelvic_peritonectomy", "resections___ruq",
    "resections___ileostomy", "Upper Jej", "Low Jej", "Upper ileum", "PCI", "Pelvic Peritonectomy",
    "icu_stay_days", "hospital_stay_days", "complications___ssi", "Any complicatioj",
    "reoperation", "Patho % ", "n specimens inv"] as const;

export type FeatureType = typeof preperationFeatures[number] | typeof surgeryFeatures[number] | typeof postSurgeryFeatures[number];

export const featureToDetails: { [key in FeatureType]: FeatureDetails } = {
    age: {
        name: "age",
        displayName: "Age",
        validators: [FloatValidator, AgeValidator]
    },
    gender: {
        name: "gender",
        displayName: "Gender",
        validators: [],
        choices: ["Male", "Female"],
        toNumber: (value: string) => value === "Male" ? 0 : 1
    },
    weight: {
        name: "weight",
        displayName: "Weight (KG)",
        validators: [FloatValidator, WeightValidator]
    },
    height: {
        name: "height",
        displayName: "Height (cm)",
        validators: [FloatValidator]
    },
    BMI: {
        name: "BMI",
        displayName: "BMI",
        validators: [FloatValidator]
    },
    DM: {
        name: "DM",
        displayName: "DM",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    HTN: {
        name: "HTN",
        displayName: "Hypertension",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    Renal: {
        name: "Renal",
        displayName: "Renal Disfunction",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    IHD: {
        name: "IHD",
        displayName: "Ischemic Heart Disease",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    COPD: {
        name: "COPD",
        displayName: "Chronic Obstructive Pulmonary Disease",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    obesity: {
        name: "obesity",
        displayName: "Obesity",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    Cva: {
        name: "Cva",
        displayName: "Cardiovascular Accident",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    asa: {
        name: "asa",
        displayName: "ASA score",
        validators: [FloatValidator]
    },
    Tumor_origin: {
        name: "Tumor_origin",
        displayName: "Tumor origin",
        validators: [FloatValidator]
    },
    extra_peritoneal___none: {
        name: "extra_peritoneal___none",
        displayName: "extra_peritoneal___none",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    extra_peritoneal___rplnd: {
        name: "extra_peritoneal___rplnd",
        displayName: "extra_peritoneal___rplnd",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    extra_peritoneal___pelvis: {
        name: "extra_peritoneal___pelvis",
        displayName: "extra_peritoneal___pelvis",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    anastomosis___sb_sb: {
        name: "anastomosis___sb_sb",
        displayName: "anastomosis___sb_sb",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    anastomosis___sb_colon: {
        name: "anastomosis___sb_colon",
        displayName: "anastomosis___sb_colon",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    resections___sb: {
        name: "resections___sb",
        displayName: "resections___sb",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    resections___parietal_peritonectomy: {
        name: "resections___parietal_peritonectomy",
        displayName: "resections___parietal_peritonectomy",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    resections___pelvic_peritonectomy: {
        name: "resections___pelvic_peritonectomy",
        displayName: "resections___pelvic_peritonectomy",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    resections___ruq: {
        name: "resections___ruq",
        displayName: "resections___ruq",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    resections___ileostomy: {
        name: "resections___ileostomy",
        displayName: "resections___ileostomy",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    resections___appendix: {
        name: "resections___appendix",
        displayName: "resections___appendix",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    LUQ: {
        name: "LUQ",
        displayName: "LUQ",
        validators: [FloatValidator]
    },
    Pelvic: {
        name: "Pelvic",
        displayName: "Pelvic",
        validators: [FloatValidator]
    },
    RLQ: {
        name: "RLQ",
        displayName: "RLQ",
        validators: [FloatValidator]
    },
    "Upper Jej": {
        name: "Upper Jej",
        displayName: "Upper Jej",
        validators: [FloatValidator]
    },
    "Low Jej": {
        name: "Low Jej",
        displayName: "Low Jej",
        validators: [FloatValidator]
    },
    "Upper ileum": {
        name: "Upper ileum",
        displayName: "Upper ileum",
        validators: [FloatValidator]
    },
    PCI: {
        name: "PCI",
        displayName: "PCI",
        validators: [FloatValidator]
    },
    "Pelvic Peritonectomy": {
        name: "Pelvic Peritonectomy",
        displayName: "Pelvic Peritonectomy",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    "Any complicatioj": {
        name: "Any complicatioj",
        displayName: "Any complicatioj",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    "Patho % ": {
        name: "Patho % ",
        displayName: "Patho % ",
        validators: [FloatValidator]
    },
    "n specimens inv": {
        name: "n specimens inv",
        displayName: "n specimens inv",
        validators: [FloatValidator]
    },
    complications___ssi: {
        name: "complications___ssi",
        displayName: "complications___ssi",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    },
    hospital_stay_days: {
        name: "hospital_stay_days",
        displayName: "hospital_stay_days",
        validators: [FloatValidator]
    },
    icu_stay_days: {
        name: "icu_stay_days",
        displayName: "icu_stay_days",
        validators: [FloatValidator]
    },
    reoperation: {
        name: "reoperation",
        displayName: "Reoperation",
        validators: [],
        choices: ["true", "false"],
        toNumber: (value: string) => value === "true" ? 1 : 0
    }
}

