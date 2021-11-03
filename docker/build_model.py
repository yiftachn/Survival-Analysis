import pickle

import numpy as np
from sksurv.ensemble import RandomSurvivalForest

from configuration.config import PROJECT_ROOT_DIR
from etl.data_loading import get_df_for_stage
from etl.train_test_split import fix_nans

model_type='post'
df = get_df_for_stage(model_type)
df = fix_nans(df)

order_by_type = {
    "pre": ['age', 'gender', 'weigth', 'bmi', "death", "survival_time_in_months" ],
    "post": ['age', 'gender', 'weight', 'BMI',
       'extra_peritoneal_none', 'extra_peritoneal_rplnd',
       'critical_lesions', 'ascites_drained', 'anastomosis_sb_colon',
       'resections_colon', 'resections_sb',
       'resections_parietal_peritonectomy',
       'resections_pelvic_peritonectomy', 'resections_omental_bursa',
       'resections_ruq', 'resections_ileostomy', 'resections_appendix',
       'Liver_involvment', 'RUQ', 'LUQ', 'RLQ', 'Rt.flank', 'Upper_Jej',
       'Low_Jej', 'Upper_ileum', 'Low_ileum', 'PCI', 'SPS',
       'Pelvic_Peritonectomy', 'or_time', 'packed_cells', 'icu_stay_days',
       'hospital_stay_days', 'complications_ssi', 'complications_bleeding',
       'complications_other_pulmonary_complications', 'Any_complicatioj',
       'reoperation', 'Patho_% ', 'n_specimens_sub', 'n_specimens_inv',
       'Obsruction (1) /Controll (0)', 'Oxaliplatin', "death", "survival_time_in_months" ],
    "intra": ['age', 'gender', 'weight', 'BMI',
       'extra_peritoneal_none', 'extra_peritoneal_rplnd',
       'critical_lesions', 'ascites_drained', 'anastomosis_sb_colon',
       'resections_colon', 'resections_sb',
       'resections_parietal_peritonectomy',
       'resections_pelvic_peritonectomy', 'resections_omental_bursa',
       'resections_ruq', 'resections_ileostomy', 'resections_appendix',
       'Liver_involvment', 'RUQ', 'LUQ', 'RLQ', 'Rt.flank', 'Upper_Jej',
       'Low_Jej', 'Upper_ileum', 'Low_ileum', 'PCI', 'SPS',
       'Pelvic_Peritonectomy', "death", "survival_time_in_months" ]
}
# fixme ------------------------------------------------------------------
features = order_by_type[model_type]
df = df[features]  # todo delete it - only for checking
# fixme ------------------------------------------------------------------

y_columns = ["death", "survival_time_in_months"]
X = df.loc[:, ~df.columns.isin(y_columns)]
y = df[y_columns].to_numpy()
y = [(element1, element2) for element1, element2 in y]
y = np.array(y, dtype=[("death", "?"), ("death_time", "<f8")])  # example from survival docs

best_model = RandomSurvivalForest(n_estimators=1000, min_samples_split=20, min_samples_leaf=5)
best_model.fit(X, y)
a = 5

with open(PROJECT_ROOT_DIR / model_type + '.pkl', 'wb') as model_pkl:
    pickle.dump(best_model, model_pkl)

# iris = datasets.load_iris()
# x = iris.data
# y = iris.target
# x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=.3)
# knn = neighbors.KNeighborsClassifier()
# knn.fit(x_train, y_train)
# predictions = knn.predict(x_test)
# print(accuracy_score(y_test, predictions))
# with open('../python_docker_heroku/model.pkl', 'wb') as model_pkl:
#     pickle.dump(knn, model_pkl)
