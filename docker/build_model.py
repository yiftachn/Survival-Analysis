import pickle

import numpy as np
from sksurv.ensemble import RandomSurvivalForest

from config import PROJECT_ROOT_DIR
from etl.data_loading import get_df_for_stage
from etl.train_test_split import fix_nans

df = get_df_for_stage('post')
df = fix_nans(df)

# fixme ------------------------------------------------------------------
df = df[["age", "gender", "weight", "death", "survival_time_in_months"]]  # todo delete it - only for checking
# fixme ------------------------------------------------------------------

y_columns = ["death", "survival_time_in_months"]
X = df.loc[:, ~df.columns.isin(y_columns)]
y = df[y_columns].to_numpy()
y = [(element1, element2) for element1, element2 in y]
y = np.array(y, dtype=[("death", "?"), ("death_time", "<f8")])  # example from survival docs

best_model = RandomSurvivalForest(n_estimators=1000, min_samples_split=20, min_samples_leaf=5)
best_model.fit(X, y)
a = 5

with open(PROJECT_ROOT_DIR / 'production_model.pkl', 'wb') as model_pkl:
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
