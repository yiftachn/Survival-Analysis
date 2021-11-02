# todo: load data using censored data that die after X months
# todo: feature selection
# todo: run classic sklearn models and score


import numpy as np
import pandas as pd
from sklearn.metrics import recall_score, precision_score
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import matthews_corrcoef
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier  # todo: normalize features for knn
import xgboost as xgb
from sklearn.model_selection import cross_val_score, cross_validate
from sklearn.feature_selection import SelectKBest, RFE, chi2
from sklearn.svm import SVR
from sksurv.ensemble import RandomSurvivalForest
from etl.data_loading import get_df_for_stage, kupitz_get_df_for_stage
from etl.train_test_split import impute_nan_values_and_split_to_train_test, \
    kupitz_impute_nan_values_and_split_to_train_test_including_censoring_with_time_larger_than_t
from config import RANDOM_STATE_MODEL
from sklearn.metrics import brier_score_loss, mean_squared_error

if __name__ == "__main__":
    pd.set_option('mode.chained_assignment', None)
    df = kupitz_get_df_for_stage('pre')
    # df = kupitz_get_df_for_stage('post') # todo nan problems

    X_train, X_test, y_train, y_test = kupitz_impute_nan_values_and_split_to_train_test_including_censoring_with_time_larger_than_t(
        df, t=3)
    y_train = y_train.values.ravel()
    y_test = y_test.values.ravel()
    # estimator = SVR(kernel="linear")
    # selector = RFE(estimator, n_features_to_select=5, step=1)
    # print(y_train)
    selector = SelectKBest(chi2, k=5).fit(X_train, y_train)
    X_train = X_train.loc[:, selector.get_support()]
    print("features:", X_train.columns)
    X_test = X_test.loc[:, selector.get_support()]
    # selector = selector.fit(X_train, y_train)
    # selector.support_
    # print(X_train)
    # scoring = ['precision', 'recall', 'f1']
    # clf = RandomForestClassifier(random_state=0)
    # clf = xgb.XGBClassifier(random_state=0)
    clf = xgb.XGBClassifier(random_state=0, max_depth=3, n_estimators=300, learning_rate=0.05)
    # clf = GaussianNB()
    clf.fit(X_train, y_train)
    probs_predicted = clf.predict_proba(X_test)[:, 1]
    y_pred = clf.predict(X_test)
    loss = brier_score_loss(y_test, probs_predicted)
    mse_loss = mean_squared_error(y_test, probs_predicted)
    recall = recall_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    print(f"brier loss: {loss}")
    print(f"mse loss: {mse_loss}")
    print(f"recall: {recall}")
    print(f"precision: {precision}")
    # print(probs_predicted)
    # for a, b in zip(probs_predicted, y_test):
    #     print(a, b)
    # print(clf.score(X_test, y_test))
    # n_cv = 5
    # print(f"cross validation validation size: {len(y_train)/n_cv}")
    # scores = cross_validate(clf, X_train, y_train.values.ravel(), cv=n_cv,
    #                         scoring=scoring, return_train_score=False)
    # print(scores["test_f1"])
    # best_features = SelectKBest()
    # classifier = RandomSurvivalForest(n_estimators=100, min_samples_split=9, min_samples_leaf=3, max_features="sqrt",
    #                                   random_state=RANDOM_STATE_MODEL)
    # classifier.fit(X_train, y_train)
    # scores = classifier.score(X_test, y_test)
    # print(scores)
    # scores = cross_val_score(classifier, X_train, y_train, cv=10)
    # print(np.mean(scores), scores)
