import sys
import os

PROJECT_ROOT = os.path.abspath(os.path.join(
    os.path.dirname(__file__),
    os.pardir)
)
sys.path.append(PROJECT_ROOT)
from sksurv.linear_model import CoxPHSurvivalAnalysis
from sksurv.metrics import as_integrated_brier_score_scorer
from models.base_model import BaseSurvivalModel

single_run_config = {
    'alpha':0,
    'n_iter':100,
    'time_of_eval':12,
    'random_seed': 734,
    'dataset': 'intra'
}



class CoxPHModel(BaseSurvivalModel):
    def __init__(self,config_dict = None):
        super().__init__()
        if config_dict is not None:
            self.config = config_dict
        print(f'config is {self.config}')
        c = self.config
        time_to_eval = c['time_of_eval']
        self.clf = as_integrated_brier_score_scorer(estimator=CoxPHSurvivalAnalysis(alpha=c['alpha'],n_iter=c['n_iter']),times=[time_to_eval,time_to_eval+0.1])


def sweep_run():
    model = CoxPHModel()
    model.train_eval()


def single_run():
    model = CoxPHModel(config_dict=single_run_config)
    model.train_eval()

if __name__ == '__main__':
    sweep_run()
