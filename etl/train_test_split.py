import numpy as np
from sklearn.model_selection import train_test_split
from config import SEED
from sklearn.impute import KNNImputer, SimpleImputer


def impute_nan_values_and_split_to_train_test(df):
    imputer = SimpleImputer()
    y_columns = ["death", "survival_time_in_months"]
    X = df.loc[:, ~df.columns.isin(y_columns)]
    X = imputer.fit_transform(X)
    y = df[y_columns].to_numpy()
    y = [(element1, element2) for element1, element2 in y]
    y = np.array(y, dtype=[("death", "?"), ("death_time", "<f8")])  # example from survival docs
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=SEED, stratify=df["death"])
    return X_train, X_test, y_train, y_test


def kupitz_impute_nan_values_and_split_to_train_test_including_censoring_with_time_larger_than_t(df, t=3):
    censored_df = df[df["death"] == 0]
    uncensored_df = df[df["death"] == 1]
    uncensored_df["alive_after_time_t"] = uncensored_df.apply(
        lambda row: row["survival_time_in_months"] > t, axis=1)
    interesting_censored_df = censored_df[censored_df["survival_time_in_months"] > t]
    interesting_censored_df["alive_after_time_t"] = True
    interesting_df = uncensored_df.append(interesting_censored_df, ignore_index=True)
    # y_columns = ["death", "survival_time_in_months"]
    y_columns = ["alive_after_time_t"]
    X = interesting_df.loc[:, ~interesting_df.columns.isin(y_columns + ["death", "survival_time_in_months"])]
    y = interesting_df[y_columns]  # .to_numpy()
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=SEED,
                                                        stratify=interesting_df["alive_after_time_t"])
    imputer = SimpleImputer().fit(X_train)
    X_train.values[:] = imputer.transform(X_train)
    X_test.values[:] = imputer.transform(X_test)
    # y = [(element1, element2) for element1, element2 in y]
    # y = np.array(y, dtype=[("death", "?"), ("survival_time_in_months", "<f8")])  # example from survival docs
    # X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=SEED,
    #                                                     stratify=interesting_df["alive_after_time_t"])
    return X_train, X_test, y_train, y_test
