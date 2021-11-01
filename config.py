import pathlib

PROJECT_ROOT_DIR = pathlib.PurePath(__file__).parent

SURVIVAL_ANALYSIS_DATA_PATH = PROJECT_ROOT_DIR / 'data/survival_analysis.xlsx'
DESC_DATA_PATH = PROJECT_ROOT_DIR / 'data/desc.xlsx'
FEATURES_TO_DROP = ["Primay pathology:", "liver", "complications___other", "resections___none", "anastomosis___none",
                    "complications___none", "Gi leaks", "Bleeding", "Other", "Death",  "complications___natropenia", "complications___delirium", "Gemzar"]
SEED = 20
RANDOM_STATE_MODEL = 42