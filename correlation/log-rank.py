from sksurv.compare import compare_survival
import numpy as np

def sort_tuples(tup): 
      
    # getting length of list of tuples
    lst = len(tup) 
    for i in range(0, lst): 
          
        for j in range(0, lst-i-1): 
            if (tup[j][1] > tup[j + 1][1]): 
                temp = tup[j] 
                tup[j]= tup[j + 1] 
                tup[j + 1]= temp 
    return tup 

def divide_column_values(column_name, df):
    values = df[column_name].values
    values.sort()
    values = list(dict.fromkeys(values))
    chuncks_size = len(values) / 2
    n = int(chuncks_size)
    # using list comprehension
    try:
        final = [values[i * n:(i + 1) * n] for i in range((len(values) + n - 1) // n )] 
        return final
    except:
        print(column_name)
        return [[values[0]]]

def arrange_values_by_groups(column_name, df, groups):
    arranged_values = []
    for i in range(len(groups)):
        for value in df[column_name].values:
            if value in groups[i]:
                arranged_values.append("group" + str(i))
    return arranged_values

def test_correlation(column_name, df):
    death_list = df["death"]
    survival_time_list = df["survival_time_in_months"]
    y = list(zip(death_list, survival_time_list))
    dt=np.dtype('bool,float')
    y_structured = np.array(y, dt)
    groups = divide_column_values(column_name, df)
    divided_values = arrange_values_by_groups(column_name, df, groups)
    res = compare_survival(y_structured, divided_values)
    return res

def test_correlation_for_all_features(df):
    features = list(df)
    features_to_ignore = ["asa", "survival_time_in_months", "record_id", "death"]
    features_with_pvalue = []
    for feature in features:
        if feature not in features_to_ignore and df[feature].isnull().sum() == 0:
            pvalue = test_correlation(feature, df)[1]
            features_with_pvalue.append((feature, pvalue))
    return features_with_pvalue