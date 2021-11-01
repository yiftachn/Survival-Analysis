from sklearn.model_selection import cross_val_score
import numpy as np
import wandb
from sksurv.ensemble import RandomSurvivalForest

from etl.data_loading import get_df_for_stage
from etl.train_test_split import impute_nan_values_and_split_to_train_test

seed = 20
hyperparameter_defaults = dict(
    n_estimators=1000,
    min_samples_split=10,
    min_samples_leaf=15,
    max_features="sqrt",
    n_jobs=-1,
    random_state=seed
)


def main():
    wandb.init(project="survival_analysis", entity="adirdayan", config=hyperparameter_defaults)
    config = wandb.config

    df = get_df_for_stage('post')
    X_train, X_test, y_train, y_test = impute_nan_values_and_split_to_train_test(df)
    classifier = RandomSurvivalForest(**config)
    scores = cross_val_score(classifier, X_train, y_train, cv=5)
    concordance = np.mean(scores)
    wandb.log({"concordance": concordance})

    # wandb.log({"data": wandb.Table(dataframe=df)})


if __name__ == '__main__':
    main()
