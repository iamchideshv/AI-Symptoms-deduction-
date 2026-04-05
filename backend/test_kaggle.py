import kagglehub
from kagglehub import KaggleDatasetAdapter

# Set the path to the file you'd like to load
file_path = "dataset.csv"

# Load the latest version
df = kagglehub.load_dataset(
  KaggleDatasetAdapter.PANDAS,
  "itachi9604/disease-symptom-description-dataset",
  file_path
)

print("First 5 records:")
print(df.head())

# Save it to our data folder so our model can train on it
output_path = "data/symptoms_data.csv"
df.to_csv(output_path, index=False)
print(f"\nSaved dataset to {output_path} successfully!")
