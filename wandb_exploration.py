import wandb
import pandas as pd

import pathlib
if __name__ == '__main__':
    wandb.init(project="survival_analysis", entity="adirdayan")

    df = pd.read_excel("data/survival_analysis.xlsx")
    df = df.drop(columns=["RAS", "Gi leaks", "primary_tumor_pathology_gr", "M", "N", "T", "reccurent_site", "follow_up_date", "reccurance", "Other", "LVI", "Severe Comp type", "1st stage", "reoperation_reason"])
    wandb.log({"data": wandb.Table(dataframe=df)})
    print(df)




