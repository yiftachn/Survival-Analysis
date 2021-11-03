import numpy as np
from sklearn.model_selection import train_test_split
from config import SEED, Y_COLUMNS
from sklearn.impute import KNNImputer, SimpleImputer


def impute_nan_values_and_split_to_train_test(df,seed:int= SEED):
    imputer = SimpleImputer()
    X = df.loc[:, ~df.columns.isin(Y_COLUMNS)]
    X = imputer.fit_transform(X)
    y = df[Y_COLUMNS].to_numpy()
    y = [(element1, element2) for element1, element2 in y]
    y = np.array(y, dtype=[("death", "?"), ("death_time", "<f8")])  # example from survival docs
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=seed, stratify=df["death"])
    return X_train, X_test, y_train, y_test
