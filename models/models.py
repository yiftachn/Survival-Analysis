from sklearn.model_selection import cross_val_score
import numpy as np
import wandb
from sksurv.ensemble import RandomSurvivalForest
from sksurv.linear_model.coxph import CoxPHSurvivalAnalysis
from sksurv.linear_model.coxnet import CoxnetSurvivalAnalysis
from multiprocessing import Pool
import sys
print(sys.path)
import os
import sys
PROJECT_ROOT = os.path.abspath(os.path.join(
                  os.path.dirname(__file__),
                  os.pardir)
)
sys.path.append(PROJECT_ROOT)
from etl.data_loading import get_df_for_stage
from etl.train_test_split import impute_nan_values_and_split_to_train_test

random_seeds = [int(x) for x in (np.random.random(size=2) * 1000)]
hyperparameter_defaults = dict(
    n_estimators=1000,
    min_samples_split=10,
    min_samples_leaf=15,
    max_features="sqrt",
    n_jobs=-1,
    random_state=20
)

run_dict = {'X_train': None, 'Y_train': None}


class BaseSurvivalModel:
    def __init__(self):
        wandb.init(project="survival_analysis", entity="survival_analysis")
        self.config = wandb.config
        self.clf = None
        self.run_dicts = []
        self.stage = 'intra'

    def train_eval(self):
        config = wandb.config
        pool = Pool(processes=8)
        for seed in random_seeds:
            df = get_df_for_stage(self.stage)
            X_train, X_test, y_train, y_test = impute_nan_values_and_split_to_train_test(df, seed=seed)
            run_dict = {}
            d = {'X_train': X_train, 'Y_train': y_train, 'clf': self.clf}
            run_dict.update(d)
            self.run_dicts.append(run_dict)
        scores = pool.map(run_cross_val, self.run_dicts)
        averaged_scores = [np.mean(cv_scores) for cv_scores in scores]
        for i,score in enumerate(averaged_scores):
            wandb.log({'concordance':score,'train_test_split_seed':random_seeds[i],'stage':self.stage})

def run_cross_val(run_dict: dict):
    scores = cross_val_score(estimator=run_dict['clf'], X=run_dict['X_train'], y=run_dict['Y_train'], cv=5)
    return scores


class RandomForestModel(BaseSurvivalModel):
    def __init__(self):
        super().__init__()
        self.clf = RandomSurvivalForest(**self.config)


def main():
    model = RandomForestModel()
    model.train_eval()
#     wandb.init(project="survival_analysis", entity="survival_analysis")
#     config = wandb.config
#     df = get_df_for_stage('post')
#     = impute_nan_values_and_split_to_train_test(df)
#
#
# classifier = RandomSurvivalForest(**config)
# scores = cross_val_score(classifier, X_train, y_train, cv=5)
# concordance = np.mean(scores)
# wandb.log({"concordance": concordance})

# wandb.log({"data": wandb.Table(dataframe=df)})


if __name__ == '__main__':
    main()
