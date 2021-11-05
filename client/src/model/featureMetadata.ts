import FeatureDetails from "./featureDetails";
import { FloatValidator, AgeValidator, WeightValidator, IntValidator } from "./validators";

export const preperationFeatures = ["age", "gender", "weight", "height", "BMI", "DM",
    "HTN", "Renal", "IHD", "COPD", "obesity", "Cva", "asa", "Tumor_origin"] as const;

export const surgeryFeatures = ["obesity", "extra_peritoneal___none", "extra_peritoneal___rplnd", "extra_peritoneal___pelvis",
    "anastomosis___sb_sb", "anastomosis___sb_colon", "resections___sb", "resections___parietal_peritonectomy",
    "resections___pelvic_peritonectomy", "resections___ruq", "resections___ileostomy", "resections___appendix",
    "LUQ", "Pelvic", "RLQ", "Upper Jej", "Low Jej", "Upper ileum", "PCI", "Pelvic Peritonectomy", "Liver involvment", "RUQ"] as const;

export const postSurgeryFeatures = ["extra_peritoneal___none", "anastomosis___sb_sb", "resections___sb",
    "resections___parietal_peritonectomy", "resections___pelvic_peritonectomy", "resections___ruq",
    "resections___ileostomy", "Upper Jej", "Low Jej", "Upper ileum", "PCI", "Pelvic Peritonectomy",
    "icu_stay_days", "hospital_stay_days", "complications___ssi", "Any complicatioj",
    "reoperation", "Patho % ", "n specimens inv"] as const;

export type FeatureType = typeof preperationFeatures[number] | typeof surgeryFeatures[number] | typeof postSurgeryFeatures[number];

const booleanOptions = ["False", "True"];

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
        choices: ["Male", "Female"]
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
        displayName: "Diabetes Melitus",
        validators: [],
        choices: booleanOptions
    },
    HTN: {
        name: "HTN",
        displayName: "Hypertension",
        validators: [],
        choices: booleanOptions
    },
    Renal: {
        name: "Renal",
        displayName: "Renal Disfunction",
        validators: [],
        choices: booleanOptions
    },
    IHD: {
        name: "IHD",
        displayName: "Ischemic Heart Disease",
        validators: [],
        choices: booleanOptions
    },
    COPD: {
        name: "COPD",
        displayName: "Chronic Obstructive Pulmonary Disease",
        validators: [],
        choices: booleanOptions
    },
    obesity: {
        name: "obesity",
        displayName: "Obesity",
        validators: [],
        choices: booleanOptions
    },
    Cva: {
        name: "Cva",
        displayName: "Cardiovascular Accident",
        validators: [],
        choices: booleanOptions
    },
    asa: {
        name: "asa",
        displayName: "ASA score",
        validators: [FloatValidator]
    },
    Tumor_origin: {
        name: "Tumor_origin",
        displayName: "Tumor Origin",
        validators: [IntValidator]
    },
    extra_peritoneal___none: {
        name: "extra_peritoneal___none",
        displayName: "Extra Peritoneal None",
        validators: [],
        choices: booleanOptions
    },
    extra_peritoneal___rplnd: {
        name: "extra_peritoneal___rplnd",
        displayName: "Extra Peritoneal Rplnd",
        validators: [],
        choices: booleanOptions
    },
    extra_peritoneal___pelvis: {
        name: "extra_peritoneal___pelvis",
        displayName: "Extra Peritoneal Pelvis",
        validators: [],
        choices: booleanOptions
    },
    anastomosis___sb_sb: {
        name: "anastomosis___sb_sb",
        displayName: "Anastomosis Sb Sb",
        validators: [],
        choices: booleanOptions
    },
    anastomosis___sb_colon: {
        name: "anastomosis___sb_colon",
        displayName: "Anastomosis Sb Colon",
        validators: [],
        choices: booleanOptions
    },
    resections___sb: {
        name: "resections___sb",
        displayName: "Resections Sb",
        validators: [],
        choices: booleanOptions
    },
    resections___parietal_peritonectomy: {
        name: "resections___parietal_peritonectomy",
        displayName: "Resections Parietal Peritonectomy",
        validators: [],
        choices: booleanOptions
    },
    resections___pelvic_peritonectomy: {
        name: "resections___pelvic_peritonectomy",
        displayName: "Resections Pelvic Peritonectomy",
        validators: [],
        choices: booleanOptions
    },
    resections___ruq: {
        name: "resections___ruq",
        displayName: "Resections Ruq",
        validators: [],
        choices: booleanOptions
    },
    resections___ileostomy: {
        name: "resections___ileostomy",
        displayName: "Resections Ileostomy",
        validators: [],
        choices: booleanOptions
    },
    resections___appendix: {
        name: "resections___appendix",
        displayName: "Resections Appendix",
        validators: [],
        choices: booleanOptions
    },
    LUQ: {
        name: "LUQ",
        displayName: "LUQ",
        validators: [IntValidator]
    },
    Pelvic: {
        name: "Pelvic",
        displayName: "Pelvic",
        validators: [IntValidator]
    },
    RLQ: {
        name: "RLQ",
        displayName: "RLQ",
        validators: [IntValidator]
    },
    "Upper Jej": {
        name: "Upper Jej",
        displayName: "Upper Jej",
        validators: [IntValidator]
    },
    "Low Jej": {
        name: "Low Jej",
        displayName: "Low Jej",
        validators: [IntValidator]
    },
    "Upper ileum": {
        name: "Upper ileum",
        displayName: "Upper Ileum",
        validators: [IntValidator]
    },
    PCI: {
        name: "PCI",
        displayName: "PCI",
        validators: [IntValidator]
    },
    "Pelvic Peritonectomy": {
        name: "Pelvic Peritonectomy",
        displayName: "Pelvic Peritonectomy",
        validators: [],
        choices: booleanOptions
    },
    "Any complicatioj": {
        name: "Any complicatioj",
        displayName: "Any Complications",
        validators: [],
        choices: booleanOptions
    },
    "Patho % ": {
        name: "Patho % ",
        displayName: "Patho % ",
        validators: [FloatValidator]
    },
    "n specimens inv": {
        name: "n specimens inv",
        displayName: "n specimens inv",
        validators: [IntValidator]
    },
    complications___ssi: {
        name: "complications___ssi",
        displayName: "Complications SSI",
        validators: [],
        choices: booleanOptions
    },
    hospital_stay_days: {
        name: "hospital_stay_days",
        displayName: "Hospital Stay Days",
        validators: [FloatValidator]
    },
    icu_stay_days: {
        name: "icu_stay_days",
        displayName: "ICU Stay Days",
        validators: [FloatValidator]
    },
    reoperation: {
        name: "reoperation",
        displayName: "Reoperation",
        validators: [],
        choices: booleanOptions
    },
    "Liver involvment": {
        name: "Liver involvment",
        displayName: "Liver Involvment",
        validators: [],
        choices: booleanOptions
    },
    RUQ: {
        name: "RUQ",
        displayName: "RUQ",
        validators: [IntValidator]
    }
    
}

