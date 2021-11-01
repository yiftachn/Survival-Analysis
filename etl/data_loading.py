import pandas as pd
import numpy as np
import config


def get_df_for_stage(stage):
    survival_analysis_df = load_and_clean_survival_analysis_df()
    desc_df = load_and_clean_desc_df()
    important_columns = ['record_id', 'survival_time_in_months', 'death']
    if stage == "post":
        survival_analysis_df = survival_analysis_df[get_post_df(desc_df, important_columns)]
    elif stage == "pre":
        survival_analysis_df = survival_analysis_df[get_pre_df(desc_df, important_columns)]
    elif stage == "intra":
        survival_analysis_df = survival_analysis_df[get_intra_df(desc_df, important_columns)]
    return survival_analysis_df


def fix_bmi_column(survival_analysis_df):
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
    return [feature for feature in features if feature not in config.FEATURES_TO_DROP]


def get_features_by_stage(desc_df, stage):
    features = list(desc_df[desc_df['Unnamed: 7'] == stage]['record_id'])
    features = remove_features_to_drop(features)
    return features


def load_and_clean_survival_analysis_df():
    survival_analysis_df = pd.read_excel(config.SURVIVAL_ANALYSIS_DATA_PATH)
    renamed_survival_analysis_df = rename_columns(survival_analysis_df)
    cleaned_survival_analysis_df = clean_nans(renamed_survival_analysis_df)
    fixed_bmi_survival_analysis_df = fix_bmi_column(cleaned_survival_analysis_df)
    return fixed_bmi_survival_analysis_df


def load_and_clean_desc_df():
    desc_df = pd.read_excel(config.DESC_DATA_PATH)
    desc_df = remove_missing_features(desc_df)
    return desc_df


def get_pre_df(desc_df, important_columns):
    pre_features = get_features_by_stage(desc_df, 'pre')
    pre_df_features = pre_features + important_columns
    return pre_df_features


def get_intra_df(desc_df, important_columns):
    intra_features = get_features_by_stage(desc_df, 'intra')
    pre_df_features = get_pre_df(desc_df, important_columns)
    intra_df_features = pre_df_features + intra_features
    return intra_df_features


def get_post_df(desc_df, important_columns):
    post_features = get_features_by_stage(desc_df, 'post')
    intra_df_features = get_intra_df(desc_df, important_columns)
    post_df_features = intra_df_features + post_features
    return post_df_features
