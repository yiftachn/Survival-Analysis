from multiprocessing import Pool
import numpy as np
import wandb
from sklearn.model_selection import cross_validate, cross_val_score
from sklearn.feature_selection import RFECV, SelectKBest, chi2
from sksurv.metrics import brier_score, concordance_index_ipcw, cumulative_dynamic_auc, as_integrated_brier_score_scorer, as_concordance_index_ipcw_scorer
from copy import deepcopy
from config import SEED
from etl.data_loading import get_df_for_stage
from etl.train_test_split import impute_nan_values_and_split_to_train_test
import sys
import os
from sklearn.model_selection import StratifiedKFold
PROJECT_ROOT = os.path.abspath(os.path.join(
    os.path.dirname(__file__),
    os.pardir)
)
sys.path.append(PROJECT_ROOT)
wandb.init(project="survival_analysis", entity="survival_analysis")


def _predict_on_cv(run_dict):
    train_indices = run_dict['indices'][0]
    val_indices = run_dict['indices'][1]
    est = deepcopy(run_dict['estimator'])
    fitted_est = est.fit(run_dict['X'].iloc[train_indices], y=run_dict['y'][train_indices])
    score = fitted_est.score(run_dict['X'].iloc[val_indices], run_dict['y'][val_indices])
    return {'estimator': fitted_est, 'test_score': score}

def death_cross_validate(estimator,X,y,n_splits=3,return_estimator = True,n_jobs=7):
    pool = Pool(processes=n_jobs)
    cv = StratifiedKFold(n_splits=n_splits,shuffle=True,random_state=SEED)
    indices = [x for x in cv.split(X,y['death'])]
    run_dicts = [{'indices':indice,'X':X,'y':y,'estimator':estimator} for indice in indices]
    results = pool.map(_predict_on_cv,run_dicts)
    result_dict = {'test_score':[result['test_score'] for result in results],
                   'estimator':[result['estimator'] for result in results ]}
    return result_dict
def run_brier_cross_val(run_dict: dict):
    clf = run_dict['clf']
    results = death_cross_validate(estimator=clf, X=run_dict['X_train'], y=run_dict['y_train'],
                                 return_estimator=True, n_jobs=7)

    # result_dict = cross_validate(estimator=clf, X=run_dict['X_train'], y=run_dict['y_train'], cv=cv,
    #                              return_estimator=True, n_jobs=7)
    return results

def run_concordance_cross_val(run_dict: dict):
    # cv = StratifiedKFold(n_splits=3,shuffle=True,random_state=SEED)
    clf = as_concordance_index_ipcw_scorer(estimator=run_dict['clf'].estimator)
    results = death_cross_validate(estimator=clf, X=run_dict['X_train'], y=run_dict['y_train'],
                         return_estimator=True, n_jobs=7)
    # result_dict = cross_validate(estimator=clf, X=run_dict['X_train'], y=run_dict['y_train'], cv=cv,
    #                              return_estimator=True, n_jobs=7)
    return results

class BaseSurvivalModel:
    def __init__(self):

        self.config = wandb.config
        self.clf = None
        self.run_dicts = []

    def train_eval(self):
        df = get_df_for_stage(self.config['dataset'])
        X_train, X_test, y_train, y_test = impute_nan_values_and_split_to_train_test(df,
                                                                                     seed=self.config['random_seed'])
        run_dict = {}
        run_dict.update({'X_train': X_train, 'y_train': y_train, 'clf': self.clf,'time':self.config['time_of_eval']})
        result_dict = run_brier_cross_val(run_dict)
        averaged_brier_score = np.nanmean(result_dict['test_score'])
        results = {'negative_brier': averaged_brier_score, 'train_test_split_seed': self.config['random_seed'],
                   'dataset': self.config['dataset'], 'num_features': X_train.shape[1],'time_of_eval':self.config['time_of_eval']}
        result_dict = run_concordance_cross_val(run_dict)
        averaged_c_scores = np.nanmean(result_dict['test_score'])
        results.update({'c-index':averaged_c_scores})
        wandb.log(results)
        print(results)
        return result_dict['estimator'][0]






def choose_k_features(run_dict: dict, k: int = 15) -> list:
    selector = RFECV(estimator=run_dict['clf'], min_features_to_select=k, n_jobs=-1)
    X_new = selector.fit_transform(X=run_dict['X_train'], y=run_dict['y_train'])
    return X_new.columns
