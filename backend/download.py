import kagglehub
import shutil
import os

print("Downloading dataset...")
# Download latest version
path = kagglehub.dataset_download("itachi9604/disease-symptom-description-dataset")

print("Path to dataset files:", path)

# Copy the dataset.csv from the downloaded path to data/symptoms_data.csv
source_file = os.path.join(path, "dataset.csv")
dest_file = os.path.join(os.path.dirname(__file__), "data", "symptoms_data.csv")

if os.path.exists(source_file):
    shutil.copy2(source_file, dest_file)
    print(f"Dataset successfully copied to: {dest_file}")
else:
    print("Could not find dataset.csv in the downloaded files. Checking directory contents:")
    for file in os.listdir(path):
        print(file)
