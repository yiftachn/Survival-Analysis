import joblib
import sys
import json

def predict(vector):
    loaded_model = joblib.load("finalized_model.sav")
    result = loaded_model.predict(vector)
    return result

data = json.loads(sys.argv[1])
predict(data)

