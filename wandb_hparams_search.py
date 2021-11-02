import pandas as pd
from sklearn.model_selection import cross_val_score
from sksurv.ensemble import RandomSurvivalForest
from sksurv.linear_model import CoxnetSurvivalAnalysis, CoxPHSurvivalAnalysis
from sksurv.metrics import as_integrated_brier_score_scorer

import wandb
from config import SEED
from etl.data_loading import get_df_for_stage
from etl.train_test_split import impute_nan_values_and_split_to_train_test

rsf_hparams_defaults = dict(
    n_estimators=1000,
    min_samples_split=10,
    min_samples_leaf=15,
    max_features="sqrt",
    n_jobs=-1,
    random_state=SEED
)

coxnet_hparams_defaults = dict(
    l1_ratio=0.99,
    fit_baseline_model=True
)

baseline_hparams_defaults = dict(
    alpha=0,
    ties="breslow",
    n_iter=100,
    tol=1e-9
)


def main():
    wandb.init(project="survival_analysis", entity="survival_analysis")  # , config=rsf_hparams_defaults)
    # config = wandb.config
    times = [3, 6, 12]  # months
    df = get_df_for_stage('post')
    X_train, X_test, y_train, y_test = impute_nan_values_and_split_to_train_test(df)

    baseline = CoxPHSurvivalAnalysis(**baseline_hparams_defaults)
    rsf = RandomSurvivalForest(**rsf_hparams_defaults)
    coxnet = CoxnetSurvivalAnalysis(**coxnet_hparams_defaults)

    # baseline_brier_scores = cross_val_score(as_integrated_brier_score_scorer(baseline, times), X_train, y_train, cv=5)
    rsf_brier_scores = cross_val_score(as_integrated_brier_score_scorer(rsf, times), X_train, y_train, cv=5)
    cox_brier_scores = cross_val_score(as_integrated_brier_score_scorer(coxnet, times), X_train, y_train, cv=5)

    results_df = pd.DataFrame(
        {
            "folds": [f"fold {i}" for i in range(5)],
            # "baseline": baseline_brier_scores,
            "rsf": rsf_brier_scores,
            "coxnet": cox_brier_scores,
        }
    )

    wandb.log({"metrics": wandb.Table(dataframe=results_df)})


if __name__ == '__main__':
    main()
