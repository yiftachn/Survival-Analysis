import numpy as np
from sklearn.model_selection import train_test_split
from config import SEED
from sklearn.impute import KNNImputer, SimpleImputer


def impute_nan_values(X_train, X_test):
    # imputer = SimpleImputer()
    # imputer.fit(X_train)
    # imputed_X_train = imputer.transform(X_train)
    # imputed_X_test = imputer.transform(X_test)
    # return imputed_X_train, imputed_X_test
    return fix_nans(X_train), fix_nans(X_test)


def fix_nans(df):
    for column in list(df.columns):
        df[column].fillna(df[column].median(), inplace=True)
    return df


def impute_nan_values_and_split_to_train_test(df):
    y_columns = ["death", "survival_time_in_months"]
    X = df.loc[:, ~df.columns.isin(y_columns)]
    y = df[y_columns].to_numpy()
    y = [(element1, element2) for element1, element2 in y]
    y = np.array(y, dtype=[("death", "?"), ("death_time", "<f8")])  # example from survival docs
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=SEED, stratify=df["death"])
    X_train, X_test = impute_nan_values(X_train, X_test)
    return X_train, X_test, y_train, y_test
