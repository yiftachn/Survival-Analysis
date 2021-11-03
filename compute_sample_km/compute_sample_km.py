from sksurv.nonparametric import kaplan_meier_estimator
import matplotlib.pyplot as plt
from etl.data_loading import get_df_for_stage

df = get_df_for_stage('post')
# df = df[df["survival_time_in_months"] < 50]


x, y = kaplan_meier_estimator(df["death"].astype(bool), df["survival_time_in_months"])
x = x[:-25]
y = y[:-25]
plt.step(x, y, where="post")
plt.ylim(0.5, 1)
# plt.xticks([3, 6, 12, 36], [3, 6, 12, 36])
# plt.grid(axis="x")
plt.show()
print(x.tolist())
print(y.tolist())