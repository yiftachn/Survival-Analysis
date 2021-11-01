from etl.data_loading import get_df_for_stage

if __name__ == "__main__":
    df = get_df_for_stage('post')
    print(df.head())