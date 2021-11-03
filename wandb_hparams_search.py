import pandas as pd
from sklearn.model_selection import cross_val_score
from sksurv.ensemble import RandomSurvivalForest
from sksurv.linear_model import CoxnetSurvivalAnalysis, CoxPHSurvivalAnalysis
from sksurv.metrics import as_integrated_brier_score_scorer

import wandb
from config import SEED
from etl.data_loading import get_df_for_stage
from etl.train_test_split import impute_nan_values_and_split_to_train_test

rsf_sweep = dict(
    n_estimators=1000,
    min_samples_split=10,
    min_samples_leaf=15,
    max_features="sqrt",
    n_jobs=-1,
    random_state=SEED
)

coxnet_sweep = dict(
    l1_ratio=0.99,
    fit_baseline_model=True
)

baseline_sweep = dict(
    alpha=0,
    ties="breslow",
    n_iter=100,
    tol=1e-9
)

import wandb

sweep_id = wandb.sweep(sweep_config)


def main():
    wandb.init(project="survival_analysis", entity="survival_analysis")  # , config=rsf_hparams_defaults)
    # config = wandb.config
    times = [3, 6, 12]  # months
    df = get_df_for_stage('intra')
    X_train, X_test, y_train, y_test = impute_nan_values_and_split_to_train_test(df)

    models = dict(
        baseline=CoxPHSurvivalAnalysis(**baseline_hparams_defaults),
        rsf=RandomSurvivalForest(**rsf_hparams_defaults),
        coxnet=CoxnetSurvivalAnalysis(**coxnet_hparams_defaults)
    )

    brier_scores = {}
    for model_name, model in models.items():
        model = as_integrated_brier_score_scorer(model, times)
        model.fit(X_train, y_train)
        brier_scores[model_name] = [model.score(X_test, y_test)]

    wandb.log({"metrics": wandb.Table(dataframe=pd.DataFrame(brier_scores))})


if __name__ == '__main__':
    main()
