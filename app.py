import numpy as np
from sklearn.model_selection import cross_val_score
from sksurv.ensemble import RandomSurvivalForest
from etl.data_loading import get_df_for_stage
from etl.train_test_split import impute_nan_values_and_split_to_train_test
from config import RANDOM_STATE_MODEL

if __name__ == "__main__":
    df = get_df_for_stage('pre')
    X_train, X_test, y_train, y_test = impute_nan_values_and_split_to_train_test(df)
    classifier = RandomSurvivalForest(n_estimators=100, min_samples_split=9, min_samples_leaf=3, max_features="sqrt",
                                      random_state=RANDOM_STATE_MODEL)
    classifier.fit(X_train, y_train)
    scores = classifier.score(X_test, y_test)
    print(scores)
    # scores = cross_val_score(classifier, X_train, y_train, cv=10)
    # print(np.mean(scores), scores)
