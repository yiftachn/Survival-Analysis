import numpy as np
import pandas as pd
from sklearn.model_selection import cross_val_score
from sksurv.ensemble import RandomSurvivalForest
from etl.data_loading import get_df_for_stage
from etl.train_test_split import impute_nan_values_and_split_to_train_test
from config import RANDOM_STATE_MODEL

if __name__ == "__main__":
    pd.set_option('mode.chained_assignment', None)
    df = get_df_for_stage('pre')
    X_train, X_test, y_train, y_test = impute_nan_values_and_split_to_train_test(df)
    classifier = RandomSurvivalForest(n_estimators=100, min_samples_split=9, min_samples_leaf=3, max_features="sqrt",
                                      random_state=RANDOM_STATE_MODEL)
    classifier.fit(X_train, y_train)
    scores = classifier.score(X_test, y_test)
    print(scores)
    pre_features = ['age', 'gender', 'weight', 'height', 'BMI', 'DM', 'Renal', 'IHD',
       'survival_time_in_months', 'death']
    # scores = cross_val_score(classifier, X_train, y_train, cv=10)
    # print(np.mean(scores), scores)
