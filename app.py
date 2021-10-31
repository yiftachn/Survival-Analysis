from etl.data_loading import get_df_for_stage

if __name__ == "__main__":
    pre_df = get_df_for_stage('pre')
    print(pre_df.head())