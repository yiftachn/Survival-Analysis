survival_analysis_data_path = 'data/survival_analysis.xlsx'
desc_data_path = 'data/desc.xlsx'
features_to_drop = ["Primay pathology:", "liver", "complications___other", "resections___none",
                        "anastomosis___none", "complications___natropenia", "complications___delirium", "Gemzar",
                        "complications___none", "Gi leaks", "Bleeding", "Other", "Death", "T", "N", "M", "Severe Comp type"]
import numpy as np
random_seeds = [int(x) for x in (np.random.random(size=2) * 1000)]
