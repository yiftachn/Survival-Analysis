import sys
from multiprocessing import Pool

from etl.data_loading import get_df_for_stage, get_post_df
from etl.train_test_split import impute_nan_values_and_split_to_train_test
from etl.data_loading import remove_features_to_drop, load_and_clean_survival_analysis_df, load_and_clean_desc_df
import sksurv
from copy import deepcopy
from sksurv.ensemble.boosting import GradientBoostingSurvivalAnalysis
from sksurv.linear_model import CoxPHSurvivalAnalysis
from sksurv.ensemble import RandomSurvivalForest
from sksurv.metrics import as_integrated_brier_score_scorer, integrated_brier_score, brier_score
from sklearn.model_selection import StratifiedKFold
import pandas as pd
import numpy as np
from collections import Counter


def get_stratified_cross_val_brier_scores(X_train_validation, y_train_validation, model, times):
    skf = StratifiedKFold(n_splits=3, random_state=0, shuffle=True)
    scores = []
    average_negative_brier_score = -999
    if isinstance(times,int):
        times = [times,times+0.01]
    for train_index, validation_index in skf.split(X_train_validation, pd.DataFrame(y_train_validation)["death"]):
        X_train_fold, X_validation_fold = X_train_validation.iloc[train_index, :], X_train_validation.iloc[
                                                                                   validation_index, :]
        y_train_fold, y_validation_fold = y_train_validation[train_index], y_train_validation[validation_index]
        clf = deepcopy(model)
        scorer = as_integrated_brier_score_scorer(estimator=clf, times=times)
        scorer.fit(X_train_fold, y_train_fold)
        scores.append(scorer.score(X_validation_fold, y_validation_fold))
        average_negative_brier_score = np.mean(scores)
    return average_negative_brier_score


def get_weakest_feature(feature_to_addition_score):
    weakest_feature = list(feature_to_addition_score.keys())[np.argmax(list(feature_to_addition_score.values()))]
    return weakest_feature


def _get_feature_addition_to_score(run_dict):
    features = run_dict['features_list']
    feature_to_remove = run_dict['feature_to_remove']
    all_features_score = run_dict['all_features_score']
    X = run_dict['X']
    y = run_dict['y']
    model = run_dict['model']
    times = run_dict['times']
    features_except_feature = [feature for feature in features if feature != feature_to_remove]
    without_feature_score = get_stratified_cross_val_brier_scores(X[features_except_feature], y, model, times)
    return all_features_score - without_feature_score


def get_features_using_rfe(X, y, model, times=(3, 6, 12), n_features_to_keep=10):
    pool = Pool(processes=7)
    features = list(X.columns)
    while len(features) > n_features_to_keep:
        print(f"len of current features: {len(features)}")
        all_features_score = get_stratified_cross_val_brier_scores(X[features], y, model, times)
        feature_addition_to_score = {feature: -np.inf for feature in features}
        run_dict_list = [
            {'X': X, 'y': y, 'all_features_score': all_features_score, 'feature_to_remove': feature_to_remove,
             'features_list': features, 'times': times, 'model': model} for feature_to_remove in features]
        feature_addition_to_score_updated = pool.map(_get_feature_addition_to_score, run_dict_list)
        for i, score in enumerate(feature_addition_to_score_updated):
            feature_addition_to_score.update({features[i]: score})
        weakest_feature = get_weakest_feature(feature_addition_to_score)
        features = [feature for feature in features if feature != weakest_feature]
    return features


if __name__ == '__main__':
    stage = 'post'
    time = 12
    times = (3, 6, 12, 24)
    df = get_df_for_stage(stage, return_all_features=True, keep_only_aggs=True)
    X_train_validation, X_test, y_train_validation, y_test = impute_nan_values_and_split_to_train_test(df, seed=0)
    clf = G
    # clf = CoxPHSurvivalAnalysis()
    print(f'{clf} feature elimination on {times}  months on {stage} dataset ')
    best_features = get_features_using_rfe(X_train_validation, y_train_validation, model=clf, times=times,
                                           n_features_to_keep=20)
    print(best_features)
