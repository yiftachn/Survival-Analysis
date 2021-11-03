import json
import os
import pickle
from logging import getLogger

# Import all the packages you need for your model below
import numpy as np
# Import Flask for creating API
from flask import Flask, request

from config import PROJECT_ROOT_DIR
from flask_cors import CORS, cross_origin

logger = getLogger("logger")
port = int(os.environ.get("PORT", 5000))
# Load the trained model from current directory
with open(PROJECT_ROOT_DIR / 'configuration/pre.pkl', 'rb') as model_pkl:
    pre = pickle.load(model_pkl)

with open(PROJECT_ROOT_DIR / 'configuration/intra.pkl', 'rb') as model_pkl:
    intra = pickle.load(model_pkl)

with open(PROJECT_ROOT_DIR / 'configuration/post.pkl', 'rb') as model_pkl:
    post = pickle.load(model_pkl)

models = {
    "pre" : pre,
    "intra" : intra,
    "post" : post
}

order_by_type = {
    "pre": ['age', 'gender', 'weight', 'BMI'],
    "post": ['age', 'gender', 'weight', 'BMI',
       'extra_peritoneal___none', 'extra_peritoneal___rplnd',
       'critical_lesions', 'ascites_drained', 'anastomosis___sb_colon',
       'resections___colon', 'resections___sb',
       'resections___parietal_peritonectomy',
       'resections___pelvic_peritonectomy', 'resections___omental_bursa',
       'resections___ruq', 'resections___ileostomy', 'resections___appendix',
       'Liver involvment', 'RUQ', 'LUQ', 'RLQ', 'Rt.flank', 'Upper Jej',
       'Low Jej', 'Upper ileum', 'Low ileum', 'PCI', 'SPS',
       'Pelvic Peritonectomy', 'or_time', 'packed_cells', 'icu_stay_days',
       'hospital_stay_days', 'complications___ssi', 'complications___bleeding',
       'complications___other_pulmonary_complications', 'Any complicatioj',
       'reoperation', 'Patho % ', 'n specimens sub', 'n specimens inv',
       'Obsruction (1) /Controll (0)', 'Oxaliplatin' ],
    "intra": ['age', 'gender', 'weight', 'BMI',
       'extra_peritoneal___none', 'extra_peritoneal___rplnd',
       'critical_lesions', 'ascites_drained', 'anastomosis___sb_colon',
       'resections___colon', 'resections___sb',
       'resections___parietal_peritonectomy',
       'resections___pelvic_peritonectomy', 'resections___omental_bursa',
       'resections___ruq', 'resections___ileostomy', 'resections___appendix',
       'Liver involvment', 'RUQ', 'LUQ', 'RLQ', 'Rt.flank', 'Upper Jej',
       'Low Jej', 'Upper ileum', 'Low ileum', 'PCI', 'SPS',
       'Pelvic Peritonectomy']
}
# Initialise a Flask app
app = Flask(__name__)

def order_features(features, type):
    ordered_vector = []
    features_by_order = order_by_type[type]
    for label in features_by_order:
        ordered_vector.append(features[label])
    return ordered_vector

# Create an API endpoint
@app.route('/predict', methods=['POST'])
@cross_origin()
def predict_model():
    # Read all necessary request parameters
    features = request.json['features']
    model_type = request.json['model_type']
    model = models[model_type]
    # raise Exception(str(features))
    # Use the predict method of the model to
    # get the prediction for unseen data
    vector = order_features(features, model_type)
    new_record = np.array([vector])
    times = [3, 6, 12, 36]
    predict_result = model.predict_survival_function(new_record)[0](times).tolist()
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
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.run(debug=True, host='0.0.0.0', port=port)
