import sys
import json
import pickle

# Load the trained model
with open('model/timetable_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Get the input data from the command line arguments
input_data = json.loads(sys.argv[1])

# Process input data (e.g., transform to appropriate format)
# ...

# Predict timetable conflict (return the result)
result = model.predict([input_data['transformedData']])
print(json.dumps(result))  # Return the result back to the backend
