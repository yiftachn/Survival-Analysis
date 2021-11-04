import pandas as pd
from config import RESECTIONS_FEATURES,ANASTAMOSES_FEATURES,COMPLICATIONS_FEATURES,EXTRA_PARITONEAL_FEATURES

def _count_from_list(original:pd.DataFrame,features_list:list)->pd.Series:

    if len(set(original.columns).intersection(set(features_list))) > 0 :
        s = original.loc[:,features_list].apply(sum,axis =1)
    else:
        return 0
    return s


def count_resections(original: pd.DataFrame) -> pd.Series:

    return _count_from_list(original,RESECTIONS_FEATURES)

def count_extra_paritoneal(original: pd.DataFrame)->pd.Series:
    return _count_from_list(original,EXTRA_PARITONEAL_FEATURES)

def count_anastamosis(original: pd.DataFrame) -> pd.Series:

    return _count_from_list(original,ANASTAMOSES_FEATURES)

def count_complications(original: pd.DataFrame) -> pd.Series:

    return _count_from_list(original,COMPLICATIONS_FEATURES)

