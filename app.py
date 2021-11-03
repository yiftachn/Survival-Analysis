import json
import os
import pickle
from logging import getLogger

# Import all the packages you need for your model below
import numpy as np
# Import Flask for creating API
from flask import Flask, request

from config import PROJECT_ROOT_DIR

logger = getLogger("logger")
port = int(os.environ.get("PORT", 5000))
# Load the trained model from current directory
with open(PROJECT_ROOT_DIR / 'production_model.pkl', 'rb') as model_pkl:
    rsf = pickle.load(model_pkl)
# Initialise a Flask app
app = Flask(__name__)


# Create an API endpoint
@app.route('/predict', methods=['GET'])
def predict_model():
    # Read all necessary request parameters
    features = request.args.to_dict()
    # raise Exception(str(features))
    # Use the predict method of the model to
    # get the prediction for unseen data
    new_record = np.array([list(features.values())])
    times = [3, 6, 12, 36]
    predict_result = rsf.predict_survival_function(new_record)[0](times).tolist()
    # return the result back
    return json.dumps(
        {
            "prediction": {
                "times": times,
                "probabilities": predict_result
            }
        }
    )


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=port)
