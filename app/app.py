import json
import os
import pickle
# Import all the packages you need for your model below
import numpy as np
# Import Flask for creating API
from flask import Flask, request
import pandas as pd
from config import PROJECT_ROOT_DIR
from flask_cors import CORS, cross_origin

port = int(os.environ.get("PORT", 80))
# Load the trained model from current directory
with open(PROJECT_ROOT_DIR / 'configuration/pre_3.pkl', 'rb') as model_pkl:
    pre_3 = pickle.load(model_pkl)

with open(PROJECT_ROOT_DIR / 'configuration/pre_6.pkl', 'rb') as model_pkl:
    pre_6 = pickle.load(model_pkl)

with open(PROJECT_ROOT_DIR / 'configuration/pre_12.pkl', 'rb') as model_pkl:
    pre_12 = pickle.load(model_pkl)

with open(PROJECT_ROOT_DIR / 'configuration/pre_24.pkl', 'rb') as model_pkl:
    pre_24 = pickle.load(model_pkl)

pre = [pre_3, pre_6, pre_12, pre_24]

with open(PROJECT_ROOT_DIR / 'configuration/intra_3.pkl', 'rb') as model_pkl:
    intra_3 = pickle.load(model_pkl)

with open(PROJECT_ROOT_DIR / 'configuration/intra_6.pkl', 'rb') as model_pkl:
    intra_6 = pickle.load(model_pkl)

with open(PROJECT_ROOT_DIR / 'configuration/intra_12.pkl', 'rb') as model_pkl:
    intra_12 = pickle.load(model_pkl)

with open(PROJECT_ROOT_DIR / 'configuration/intra_240.pkl', 'rb') as model_pkl:
    intra_24 = pickle.load(model_pkl)

intra = [intra_3, intra_6, intra_12, intra_24]

with open(PROJECT_ROOT_DIR / 'configuration/post_3.pkl', 'rb') as model_pkl:
    post_3 = pickle.load(model_pkl)

with open(PROJECT_ROOT_DIR / 'configuration/post_6.pkl', 'rb') as model_pkl:
    post_6 = pickle.load(model_pkl)

with open(PROJECT_ROOT_DIR / 'configuration/post_12.pkl', 'rb') as model_pkl:
    post_12 = pickle.load(model_pkl)

with open(PROJECT_ROOT_DIR / 'configuration/post_24.pkl', 'rb') as model_pkl:
    post_24 = pickle.load(model_pkl)

post = [post_3, post_6, post_12, post_24]

models = {
    "pre" : pre,
    "intra" : intra,
    "post" : post
}

model_sub_types = ["3", "6" , "12", "24"]

default_values = {
        "pre": {
            'age': 61.9,
 'gender': 1.0,
 'weight': 70.0,
 'height': 167.0,
 'BMI': 26.0,
 'DM': 0.0,
 'HTN': 0.0,
 'Renal': 0.0,
 'IHD': 0.0,
 'COPD': 0.0,
 'obesity': 0.0,
 'Cva': 0.0,
 'asa': 3.0,
 'Tumor_origin': 1.0
        },
        "intra": {'obesity': 0.0,
 'extra_peritoneal___none': 0.0,
 'extra_peritoneal___rplnd': 0.0,
 'extra_peritoneal___pelvis': 0.0,
 'anastomosis___sb_sb': 0.0,
 'anastomosis___sb_colon': 0.0,
 'resections___sb': 0.0,
 'resections___parietal_peritonectomy': 0.0,
 'resections___pelvic_peritonectomy': 0.0,
 'resections___ruq': 0.0,
 'resections___ileostomy': 0.0,
 'resections___appendix': 0.0,
 'LUQ': 0.0,
 'Pelvic': 2.0,
 'RLQ': 0.0,
 'Upper Jej': 0.0,
 'Low Jej': 0.0,
 'Upper ileum': 0.0,
 'PCI': 7.0,
 'Pelvic Peritonectomy': 0.0},
 "post": {'extra_peritoneal___none': 0.0,
 'anastomosis___sb_sb': 0.0,
 'resections___sb': 0.0,
 'resections___parietal_peritonectomy': 0.0,
 'resections___pelvic_peritonectomy': 0.0,
 'resections___ruq': 0.0,
 'resections___ileostomy': 0.0,
 'RLQ': 0.0,
 'Upper Jej': 0.0,
 'Low Jej': 0.0,
 'Upper ileum': 0.0,
 'PCI': 7.0,
 'Pelvic Peritonectomy': 0.0,
 'icu_stay_days': 1.0,
 'hospital_stay_days': 10.0,
 'complications___ssi': 0.0,
 'Any complicatioj': 0.0,
 'reoperation': 0.0,
 'Patho % ': 0.285714285714286,
 'n specimens inv': 3.0}
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

def fill_missing_values(vector, type):
    for label in default_values[type]:
        if label not in vector:
            vector[label] = default_values[type][label]
    return vector

def get_correct_prediction(time, values):
    index = 0
    for exact_time in values[0].x:
        if exact_time >= time:
            return values[0].y[index]
        index+=1
    return values[0].y[index]

# Create an API endpoint
@app.route('/predict', methods=['POST'])
@cross_origin()
def predict_model():
    # Read all necessary request parameters
    features = request.json['features']
    model_type = request.json['model_type']
    model_arr = models[model_type]
    # raise Exception(str(features))
    # Use the predict method of the model to
    # get the prediction for unseen data
    vector = fill_missing_values(features, model_type)
    record = pd.DataFrame(vector, index=[0])
    times = [3, 6, 12, 36]
    result = {}
    index = 0
    for model in model_arr:
        predict_result = model.predict_survival_function(record)
        print(predict_result[0])
        score = get_correct_prediction(times[index], predict_result)
        print(score)
        result[times[index]] = score
        index+=1
    # return the result back
    print(result)
    return json.dumps   (result)
    


if __name__ == '__main__':
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.run(debug=True, host='0.0.0.0', port=port)
