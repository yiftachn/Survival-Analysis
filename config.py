import pathlib

PROJECT_ROOT_DIR = pathlib.PurePath(__file__).parent

SURVIVAL_ANALYSIS_DATA_PATH = PROJECT_ROOT_DIR / 'data/survival_analysis.xlsx'
DESC_DATA_PATH = PROJECT_ROOT_DIR / 'data/desc.xlsx'
FEATURES_TO_DROP = ["Primay pathology:", "liver", "complications___other", "resections___none", "anastomosis___none",
                    "complications___none", "Gi leaks", "Bleeding", "Other", "Death", "complications___natropenia",
                    "complications___delirium", "Gemzar", 'resections___appendix']
KUPITZ_FEATURES = ['age', 'gender', 'weight', 'BMI', 'extra_peritoneal___none', 'extra_peritoneal___rplnd',
                   'critical_lesions', 'ascites_drained', 'anastomosis___sb_colon', 'resections___colon',
                   'resections___sb', 'resections___parietal_peritonectomy', 'resections___pelvic_peritonectomy',
                   'resections___omental_bursa', 'resections___ruq', 'resections___ileostomy', 'resections___appendix',
                   'Liver involvment', 'RUQ', 'LUQ', 'RLQ', 'Rt.flank', 'Upper Jej', 'Low Jej', 'Upper ileum',
                   'Low ileum', 'PCI', 'SPS', 'Pelvic Peritonectomy', 'or_time', 'packed_cells', 'icu_stay_days',
                   'hospital_stay_days', 'complications___ssi', 'complications___bleeding',
                   'complications___other_pulmonary_complications', 'Any complicatioj', 'reoperation', 'Patho % ',
                   'n specimens sub', 'n specimens inv', 'Obsruction (1) /Controll (0)', 'Oxaliplatin']
PRE_FEATURES = ['age', 'gender', 'weight', 'height', 'BMI', 'DM', 'Renal', 'IHD',
                'survival_time_in_months', 'death']

Y_COLUMNS = ["death", "survival_time_in_months"]

PRE_FEATURES_TO_KEEP = ['obesity', 'Tumor_origin', 'IHD', 'age', 'asa', 'DM', 'COPD']
INTRA_FEATURES_TO_KEEP = ['resections___parietal_peritonectomy', 'Upper ileum', 'PCI', 'Pelvic Peritonectomy', 'resections___sb', 'Low Jej', 'extra_peritoneal___none', 'resections___ileostomy', 'RLQ', 'resections___pelvic_peritonectomy', 'Upper Jej', 'anastomosis___sb_sb', 'resections___ruq', 'resections___appendix', 'anastomosis___sb_colon', 'LUQ', 'extra_peritoneal___pelvis', 'extra_peritoneal___rplnd', 'obesity', 'Pelvic']
POST_FEATURES_TO_KEEP = ['Patho % ', 'n specimens inv', 'reoperation', 'resections___parietal_peritonectomy', 'Upper ileum', 'PCI', 'hospital_stay_days', 'Pelvic Peritonectomy', 'resections___sb', 'Low Jej', 'icu_stay_days', 'extra_peritoneal___none', 'resections___ileostomy', 'RLQ', 'resections___pelvic_peritonectomy', 'Upper Jej', 'anastomosis___sb_sb', 'resections___ruq', 'Any complicatioj', 'complications___ssi', 'resections___appendix', 'anastomosis___sb_colon', 'packed_cells', 'complications___other_pulmonary_complications', 'n specimens sub', 'T', 'LUQ', '5FU+ Leucovorin', 'N', 'complications___renal_failure']
FEATURES_TO_KEEP = KUPITZ_FEATURES
PRE_FEATURES_TO_KEEP = ['obesity', 'Tumor_origin', 'IHD', 'age', 'asa', 'DM', 'COPD', 'weight']
INTRA_FEATURES_TO_KEEP = ['weight',
                          'height',
                          'DM',
                          'extra_peritoneal___rplnd',
                          'ascites_drained',
                          'anastomosis___sb_sb',
                          'resections___sb',
                          'resections___anterior_resection',
                          'resections___cystectomy',
                          'resections___ileostomy',
                          'Central',
                          'RUQ',
                          'Epigastric',
                          'LUQ',
                          'LLQ',
                          'Low Jej',
                          'Upper ileum',
                          'PCI',
                          'SPS',
                          'Pelvic Peritonectomy']
# INTRA_FEATURES_TO_KEEP=['critical_lesions', 'Liver involvment', 'SPS', 'Upper ileum', 'PCI', 'Pelvic Peritonectomy',
# 'resections___sb', 'Low Jej',
# 'extra_peritoneal__none', 'resections_ileostomy', 'RLQ', 'Upper Jej',
# 'anastomosis__sb_sb', 'resections_ruq', 'weight', 'anastomosis__sb_colon', 'LUQ',
# 'extra_peritoneal__pelvis', 'extra_peritoneal__rplnd', 'obesity', 'Pelvic']
# POST_FEATURES_TO_KEEP = ['critical_lesions', 'Liver involvment', 'SPS', 'Patho % ', 'n specimens inv', 'reoperation',
#                          'resections___parietal_peritonectomy', 'Upper ileum', 'PCI', 'hospital_stay_days',
#                          'Pelvic Peritonectomy', 'resections__sb', 'Low Jej', 'icu_stay_days', 'weight',
#                          'extra_peritoneal_none', 'resections_ileostomy', 'RLQ', 'Upper Jej', 'anastomosis_sb_sb',
#                          'resections_ruq', 'Any complicatioj', 'complications__ssi']
POST_FEATURES_TO_KEEP = ['weight', 'height', 'obesity', 'Liver involvment', 'RUQ', 'Epigastric', 'LUQ', 'LLQ',
                         'Low Jej', 'PCI', 'SPS', 'or_time', 'icu_stay_days', 'hospital_stay_days', 'reoperation',
                         'Patho % ', 'n specimens inv', 'N', 'scar_involvement', '5FU+ Leucovorin']

RESECTIONS_FEATURES = ['resections___colon',
                       'resections___sb',
                       'resections___anterior_resection',
                       'resections___spleen',
                       'resections___pancreas',
                       'resections___cholecystectomy',
                       'resections___cystectomy',
                       'resections___omentum',
                       'resections___liver',
                       'resections___stomach',
                       'resections___uterus_ovarian',
                       'resections___parietal_peritonectomy',
                       'resections___pelvic_peritonectomy',
                       'resections___omental_bursa',
                       'resections___ruq',
                       'resections___luq',
                       'resections___mesenteric_peritonectomy',
                       'resections___colostomy',
                       'resections___ileostomy',
                       ]
ANASTAMOSES_FEATURES = [
    'anastomosis___sb_sb',
    'anastomosis___gastro_sb',
    'anastomosis___sb_colon',
    'anastomosis___colon_colon',
    'anastomosis___colon_rectum',
    'anastomosis___sb_rectum',
]
COMPLICATIONS_FEATURES = [
    'complications___ssi',
    'complications___uti',
    'complications___bleeding',
    'complications___anastomotic_leak_fistula',
    'complications___dvt',
    'complications___pe',
    'complications___pneumonia',
    'complications___other_pulmonary_complications',
    'complications___dehiscence',
    'complications___collections',
    'complications___ileus',
    'complications___line_sepsis',
    'complications___liver_failure',
    'complications___renal_failure',
    'complications___other_tromboembolic_event',
    'complications___atalectasis',
]
EXTRA_PARITONEAL_FEATURES = [
    'extra_peritoneal___liver',
    'extra_peritoneal___pancreas',
    'extra_peritoneal___rplnd',
    'extra_peritoneal___pelvis',
    'extra_peritoneal___groin',
    'extra_peritoneal___abdominal_wall'
]

feature_sets = {
    'gbm_all_times': ['weight', 'height', 'obesity', 'Liver involvment', 'RUQ', 'Epigastric', 'LUQ', 'LLQ', 'Low Jej',
                      'PCI', 'SPS', 'or_time', 'icu_stay_days', 'hospital_stay_days', 'reoperation', 'Patho % ',
                      'n specimens inv', 'N', 'scar_involvement', '5FU+ Leucovorin']

}

SEED = 20
RANDOM_STATE_MODEL = 42
