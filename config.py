import pathlib

PROJECT_ROOT_DIR = pathlib.PurePath(__file__).parent

SURVIVAL_ANALYSIS_DATA_PATH = PROJECT_ROOT_DIR / 'data/survival_analysis.xlsx'
DESC_DATA_PATH = PROJECT_ROOT_DIR / 'data/desc.xlsx'
FEATURES_TO_DROP = ["Primay pathology:", "liver", "complications___other", "resections___none", "anastomosis___none",
                    "complications___none", "Gi leaks", "Bleeding", "Other", "Death",  "complications___natropenia", "complications___delirium", "Gemzar"]
KUPITZ_FEATURES = ['age', 'gender', 'weight', 'BMI', 'extra_peritoneal___none', 'extra_peritoneal___rplnd', 'critical_lesions', 'ascites_drained', 'anastomosis___sb_colon', 'resections___colon', 'resections___sb', 'resections___parietal_peritonectomy', 'resections___pelvic_peritonectomy', 'resections___omental_bursa', 'resections___ruq', 'resections___ileostomy', 'resections___appendix', 'Liver involvment', 'RUQ', 'LUQ', 'RLQ', 'Rt.flank', 'Upper Jej', 'Low Jej', 'Upper ileum', 'Low ileum', 'PCI', 'SPS', 'Pelvic Peritonectomy', 'or_time', 'packed_cells', 'icu_stay_days', 'hospital_stay_days', 'complications___ssi', 'complications___bleeding', 'complications___other_pulmonary_complications', 'Any complicatioj', 'reoperation', 'Patho % ', 'n specimens sub', 'n specimens inv', 'Obsruction (1) /Controll (0)', 'Oxaliplatin']
PRE_FEATURES = ['age', 'gender', 'weight', 'height', 'BMI', 'DM', 'Renal', 'IHD',
       'survival_time_in_months', 'death']

Y_COLUMNS = ["death", "survival_time_in_months"]

FEATURES_TO_KEEP = KUPITZ_FEATURES
PRE_FEATURES_TO_KEEP = ['obesity', 'Tumor_origin', 'IHD', 'age', 'asa', 'DM', 'COPD','weight']
INTRA_FEATURES_TO_KEEP = INTRA_FEATURES_TO_KEEP = ['critical_lesions','Liver involvment','SPS', 'Upper ileum', 'PCI', 'Pelvic Peritonectomy', 'resections___sb', 'Low Jej',
                          'extra_peritoneal__none', 'resections_ileostomy', 'RLQ', 'resections__pelvic_peritonectomy', 'Upper Jej',
                          'anastomosis__sb_sb', 'resections_ruq','weight', 'anastomosis__sb_colon', 'LUQ',
                          'extra_peritoneal__pelvis', 'extra_peritoneal__rplnd', 'obesity', 'Pelvic']
POST_FEATURES_TO_KEEP = ['critical_lesions','Liver involvment','SPS','Patho % ', 'n specimens inv', 'reoperation', 'resections___parietal_peritonectomy', 'Upper ileum', 'PCI', 'hospital_stay_days',
                         'Pelvic Peritonectomy', 'resections__sb', 'Low Jej', 'icu_stay_days','weight', 'extra_peritoneal_none', 'resections_ileostomy', 'RLQ', 'Upper Jej', 'anastomosis_sb_sb', 'resections_ruq', 'Any complicatioj', 'complications__ssi']
SEED = 20
RANDOM_STATE_MODEL = 42