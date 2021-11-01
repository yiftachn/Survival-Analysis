import numpy as np
from sklearn.model_selection import train_test_split
from configuration.config import TRAIN_TEST_SPLIT_SEED


def impute_nan_values_and_split_to_train_test(df):
    y_columns = ["death", "survival_time_in_months"]
    X = df.loc[:, ~df.columns.isin(y_columns)]
    y = df[y_columns].to_numpy()
    y = [(element1, element2) for element1, element2 in y]
    y = np.array(y, dtype=[("death", "?"), ("death_time", "<f8")])
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=TRAIN_TEST_SPLIT_SEED,
                                                        stratify=df["death"])
    return X_train, X_test, y_train, y_test
