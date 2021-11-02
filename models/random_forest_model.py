import sys
import os

PROJECT_ROOT = os.path.abspath(os.path.join(
    os.path.dirname(__file__),
    os.pardir)
)
sys.path.append(PROJECT_ROOT)
from sksurv.ensemble import RandomSurvivalForest
from sksurv.metrics import as_integrated_brier_score_scorer
from models.base_model import BaseSurvivalModel

single_run_config = {
    'n_estimators': 100,
    'min_samples_split': 5,
    'min_samples_leaf': 5,
    'random_seed': 734,
    'dataset': 'pre'
}


class RandomForestModel(BaseSurvivalModel):
    def __init__(self,config_dict = None):
        super().__init__()
        if config_dict is not None:
            self.config = config_dict
        c = self.config
        self.clf = as_integrated_brier_score_scorer(estimator=RandomSurvivalForest(c['n_estimators'], c['min_samples_split'], c['min_samples_leaf'], n_jobs=-1),times=[12,12.1])


def sweep_run():
    model = RandomForestModel()
    model.train_eval()


def single_run():
    model = RandomForestModel(config_dict=single_run_config)
    model.train_eval()

if __name__ == '__main__':
    single_run()
