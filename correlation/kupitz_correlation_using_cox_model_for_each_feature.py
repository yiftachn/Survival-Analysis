import numpy as np
import pandas as pd
from sksurv.ensemble import RandomSurvivalForest
from etl.data_loading import get_df_for_stage
from etl.train_test_split import impute_nan_values_and_split_to_train_test
from config import RANDOM_STATE_MODEL
from sksurv.linear_model import CoxPHSurvivalAnalysis
from sklearn.model_selection import cross_val_score


# import wandb

# wandb.init(project="my-test-project", entity="ak97")
def fit_and_score_features(X, y):
    n_features = X.shape[1]
    scores = np.empty(n_features)
    m = CoxPHSurvivalAnalysis()
    for j in range(n_features):
        try:
            Xj = X[:, j:j + 1]
            m.fit(Xj, y)
            # scores[j] = m.score(Xj, y)
            scores[j] = np.mean(cross_val_score(m, Xj, y, cv=5))
            # print(np.mean(scores
        except:
            print("j", j)
            scores[j] = -1
    return scores


if __name__ == "__main__":
    pd.set_option('mode.chained_assignment', None)
    df = get_df_for_stage('post')
    y_columns = ["death", "survival_time_in_months"]
    X_columns = df.loc[:, ~df.columns.isin(y_columns)].columns
    X_train, X_test, y_train, y_test = impute_nan_values_and_split_to_train_test(df)
    scores = fit_and_score_features(X_train, y_train)
    features = X_columns
    features_to_keep = []
    for feature, score in zip(features, scores):
        if score > 0.54:
            print(f"feature {feature} was selected with score {score}")
            features_to_keep.append(feature)
        else:
            print(f"!!!!Bad feature {feature} was not selected with score {score}")
    print("features to use:", features_to_keep)
    print("those features are in the config")
