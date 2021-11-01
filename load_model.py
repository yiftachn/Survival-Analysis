import joblib
import sys
import json

def predict(data):
    order = ['age', 'gender', 'weigth', 'bmi']
    vector = order_data(data, order)
    loaded_model = joblib.load("finalized_model.sav")
    result = loaded_model.predict(vector)
    return result

def order_data(data, order):
    vector = []
    for label in order:
        vector.append(data[label])
    return vector


data = json.loads(sys.argv[1])
predict(data)

