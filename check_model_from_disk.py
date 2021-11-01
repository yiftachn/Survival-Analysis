import joblib

def predict(vector):
    loaded_model = joblib.load("finalized_model.sav")
    result = loaded_model.predict(vector)
    return result

predict()

