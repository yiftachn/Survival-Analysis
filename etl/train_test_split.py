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