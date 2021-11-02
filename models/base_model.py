from multiprocessing import Pool

import numpy as np
import wandb
from sklearn.model_selection import cross_validate, cross_val_score
from sksurv.metrics import brier_score, concordance_index_ipcw, cumulative_dynamic_auc
from etl.data_loading import get_df_for_stage
from etl.train_test_split import impute_nan_values_and_split_to_train_test
import sys
import os
PROJECT_ROOT = os.path.abspath(os.path.join(
                  os.path.dirname(__file__),
                  os.pardir)
)
sys.path.append(PROJECT_ROOT)

class BaseSurvivalModel:
    def __init__(self):
        wandb.init(project="survival_analysis", entity="survival_analysis")
        self.config = wandb.config
        self.clf = None
        self.run_dicts = []
        self.cross_val = run_cross_val
    def train_eval(self):
        df = get_df_for_stage(self.config['dataset'])
        X_train, X_test, y_train, y_test = impute_nan_values_and_split_to_train_test(df, seed=self.config['random_seed'])
        run_dict = {}
        run_dict.update({'X_train': X_train, 'Y_train': y_train, 'clf': self.clf})
        scores = self.cross_val(run_dict)
        averaged_score = np.mean(scores)
        wandb.log({'negative_brier':averaged_score,'train_test_split_seed':self.config['random_seed'],'stage':self.config['dataset']})


def run_cross_val(run_dict: dict):
    scores = cross_val_score(estimator=run_dict['clf'], X=run_dict['X_train'], y=run_dict['Y_train'], cv=5)
    return scores