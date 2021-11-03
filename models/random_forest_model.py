import sys
import os
PROJECT_ROOT = os.path.abspath(os.path.join(
    os.path.dirname(__file__),
    os.pardir)
)
sys.path.append(PROJECT_ROOT)
from sklearn.model_selection import cross_validate
from etl.data_loading import get_df_for_stage
from etl.train_test_split import impute_nan_values_and_split_to_train_test
from config import Y_COLUMNS


from sksurv.ensemble import RandomSurvivalForest
from sksurv.metrics import as_integrated_brier_score_scorer
from models.base_model import BaseSurvivalModel

single_run_config = {
    'n_estimators': 100,
    'min_samples_split': 5,
    'min_samples_leaf': 5,
    'random_seed': 734,
    'dataset': 'intra',
    'time_of_eval': 12
}


class RandomForestModel(BaseSurvivalModel):
    def __init__(self,config_dict = None):
        super().__init__()
        if config_dict is not None:
            self.config = config_dict
        print(f'config is {self.config}')
        c = self.config
        time_to_eval = c['time_of_eval']
        self.clf = as_integrated_brier_score_scorer(estimator=RandomSurvivalForest(c['n_estimators'], c['min_samples_split'], c['min_samples_leaf'], n_jobs=-1),times=[time_to_eval,time_to_eval+0.1])


def sweep_run():
    model = RandomForestModel()
    model.train_eval()


def single_run():
    model = RandomForestModel(config_dict=single_run_config)
    model.train_eval()


def invesitgate_best_model():
    df = get_df_for_stage('intra')
    clf = as_integrated_brier_score_scorer(
        estimator=RandomSurvivalForest(n_estimators=1000, min_samples_split=15, min_samples_leaf = 20, n_jobs=-1),
        times=[12, 12 + 0.1])
    X_train, X_test, y_train, y_test = impute_nan_values_and_split_to_train_test(df, seed=2000)
    run_dict = {}
    run_dict.update({'X_train': X_train, 'y_train': y_train, 'clf': clf})
    result_dict = run_cross_val(run_dict)



# df = get_df_for_stage(self.config['dataset'])
#         X_train, X_test, y_train, y_test = impute_nan_values_and_split_to_train_test(df, seed=self.config['random_seed'])
#         run_dict = {}
#         run_dict.update({'X_train': X_train, 'y_train': y_train, 'clf': self.clf})
#         result_dict = self.cross_val(run_dict)
#         averaged_brier_score = np.mean(result_dict['test_score'])
#         results = {'negative_brier':averaged_brier_score,'train_test_split_seed':self.config['random_seed'],'stage':self.config['dataset'],'num_features':X_train.shape[1]}
#         wandb.log(results)
#         print(results)
#
#
def run_cross_val(run_dict: dict):
    result_dict = cross_validate(estimator=run_dict['clf'], X=run_dict['X_train'], y=run_dict['y_train'], cv=5,return_estimator=True,n_jobs=7)
    return result_dict
#
# def choose_k_features(run_dict: dict ,k:int  = 15)->list:
#     selector = RFECV(estimator=run_dict['clf'],min_features_to_select=k,n_jobs=-1)
#     X_new = selector.fit_transform(X=run_dict['X_train'],y=run_dict['y_train'])
#     return X_new.columns
#


if __name__ == '__main__':
    sweep_run()
