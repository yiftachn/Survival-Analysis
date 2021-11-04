from typing import List

import pandas as pd
import numpy as np
import config
from etl.feature_engineering import count_resections, count_complications, count_anastamosis, count_extra_paritoneal


def get_df_for_stage(stage, return_all_features=False,keep_only_aggs=False):
    survival_analysis_df = load_and_clean_survival_analysis_df()
    desc_df = load_and_clean_desc_df()
    important_columns = ['survival_time_in_months', 'death']
    if stage == "post":
        survival_analysis_df = survival_analysis_df[get_post_df(desc_df, important_columns, return_all_features)]
        if return_all_features:
            survival_analysis_df = add_aggs(survival_analysis_df, keep_only_aggs)
    elif stage == "pre":
        survival_analysis_df = survival_analysis_df[get_pre_df(desc_df, important_columns, return_all_features)]
    elif stage == "intra":
        survival_analysis_df = survival_analysis_df[get_intra_df(desc_df, important_columns, return_all_features)]
        if return_all_features:
            survival_analysis_df = add_aggs(survival_analysis_df, keep_only_aggs)
    return survival_analysis_df


def add_aggs(df,keep_only_aggs=False):
    df['resections_count'] = count_resections(df)
    df['anastamoses_count'] = count_anastamosis(df)
    df['complications_count'] = count_complications(df)
    df['extra_paritoneal_count'] = count_extra_paritoneal(df)
    if keep_only_aggs:
        df = df.drop(config.RESECTIONS_FEATURES,axis=1)
        df = df.drop(config.ANASTAMOSES_FEATURES,axis=1)
        df = df.drop(config.COMPLICATIONS_FEATURES,axis=1)
        df = df.drop(config.EXTRA_PARITONEAL_FEATURES,axis=1)

    return df

def fix_bmi_column(survival_analysis_df):
    survival_analysis_df = survival_analysis_df.copy()
    survival_analysis_df["BMI"] = survival_analysis_df.apply(
        lambda row: np.round(row["weight"] / (row["height"] / 100) ** 2), axis=1)
    return survival_analysis_df


def rename_columns(survival_analysis_df):
    rename_columns = {"OS": "survival_time_in_months"}
    renamed_survival_analysis_df = survival_analysis_df.rename(columns=rename_columns)
    return renamed_survival_analysis_df


def clean_nans(survival_analysis_df):
    survival_analysis_df = survival_analysis_df[~pd.isna(survival_analysis_df["survival_time_in_months"])]
    return survival_analysis_df


def remove_missing_features(desc_df):
    desc_df_no_missing = desc_df[desc_df['Unnamed: 3'] != "missing"]
    return desc_df_no_missing


def remove_features_to_drop(features):
    return [feature for feature in features if
            feature not in config.FEATURES_TO_DROP]  # and feature in config.FEATURES_TO_KEEP]


def keep_default_features(features):
    return [feature for feature in features if
            feature in config.FEATURES_TO_KEEP]  # and feature in config.FEATURES_TO_KEEP]


def get_features_by_stage(desc_df, stage, use_default_features=False):
    features = list(desc_df[desc_df['Unnamed: 7'] == stage]['record_id'])
    features = remove_features_to_drop(features)
    if use_default_features:
        features = keep_default_features(features)
    return features


def load_and_clean_survival_analysis_df():
    survival_analysis_df = pd.read_excel(config.SURVIVAL_ANALYSIS_DATA_PATH)
    renamed_survival_analysis_df = rename_columns(survival_analysis_df)
    cleaned_survival_analysis_df = clean_nans(renamed_survival_analysis_df)
    fixed_bmi_survival_analysis_df = fix_bmi_column(cleaned_survival_analysis_df)
    fixed_object_cols_survival_analysis_df = _fix_object_columns(fixed_bmi_survival_analysis_df)
    return fixed_object_cols_survival_analysis_df


def _fix_object_columns(df: pd.DataFrame) -> pd.DataFrame:
    object_cols = _get_object_columns(df)
    for column in object_cols:
        if column in {'T', 'M', 'N'}:
            df[column] = df[column].map(lambda original_item: 0 if original_item == 'x' else original_item)
        elif column == 'Severe Comp type':
            df[column] = df[column].map(str).map(
                lambda original_item: '3' if original_item[0] == '3' else original_item).map(
                lambda original_item: int(original_item) if not original_item == 'nan' else np.nan)
    return df


def _get_object_columns(df: pd.DataFrame) -> List[str]:
    object_cols = []
    for i, dtype in enumerate(df.dtypes):
        if np.issubdtype(dtype, object):
            object_cols.append(df.dtypes.index[i])
    return object_cols


def load_and_clean_desc_df():
    desc_df = pd.read_excel(config.DESC_DATA_PATH)
    desc_df = remove_missing_features(desc_df)
    return desc_df


def get_pre_df(desc_df, important_columns, return_all_features=False):
    pre_features = get_features_by_stage(desc_df, 'pre')
    pre_df_features = pre_features + important_columns
    if not return_all_features:
        pre_df_features = [feature for feature in pre_df_features if feature in config.PRE_FEATURES_TO_KEEP]  + important_columns
    else:
        for feature in important_columns:
            if feature not in pre_df_features:
                pre_df_features.append(feature)
    return pre_df_features


def get_intra_df(desc_df, important_columns, return_all_features=False):
    intra_features = get_features_by_stage(desc_df, 'intra')
    pre_df_features = get_pre_df(desc_df, important_columns, return_all_features)
    intra_df_features = pre_df_features + intra_features
    if not return_all_features:
        intra_df_features = [feature for feature in intra_df_features if feature in config.INTRA_FEATURES_TO_KEEP] + important_columns
    else:
        for feature in important_columns:
            if feature not in intra_df_features:
                intra_df_features.append(feature)
    return intra_df_features


def get_post_df(desc_df, important_columns, return_all_features=False):
    post_features = get_features_by_stage(desc_df, 'post')
    intra_df_features = get_intra_df(desc_df, important_columns, return_all_features)
    post_df_features = intra_df_features + post_features
    if not return_all_features:
        post_df_features = [feature for feature in post_df_features if feature in config.POST_FEATURES_TO_KEEP] + important_columns
    else:
        for feature in important_columns:
            if feature not in post_df_features:
                post_df_features.append(feature)
    return post_df_features
