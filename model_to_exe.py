from sklearn.model_selection import cross_val_score
import numpy as np
from sksurv.ensemble import RandomSurvivalForest
import joblib

from etl.data_loading import get_df_for_stage
from etl.train_test_split import impute_nan_values_and_split_to_train_test

seed = 20
hyperparameter_defaults = dict(
    n_estimators=1000,
    min_samples_split=10,
    min_samples_leaf=15,
    max_features="sqrt",
    n_jobs=-1,
    random_state=seed
)


def main():

    df = get_df_for_stage('pre')
    X_train, X_test, y_train, y_test = impute_nan_values_and_split_to_train_test(df)
    classifier = RandomSurvivalForest(**hyperparameter_defaults)
    classifier.fit(X_train, y_train)

    filename = 'finalized_model.sav'
    joblib.dump(classifier, filename)



if __name__ == '__main__':
    main()
