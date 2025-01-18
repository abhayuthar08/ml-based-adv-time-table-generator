import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

# Assuming you have historical data
data = pd.read_csv('historical_timetable_data.csv')
X = data.drop('conflict', axis=1)  # Input features
y = data['conflict']  # Target variable (conflict)

# Train the model
model = RandomForestClassifier()
model.fit(X, y)

# Save the model
with open('model/timetable_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)
