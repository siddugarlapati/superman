import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

PLOTS_DIR = os.path.join(os.path.dirname(__file__), "static_plots")
if not os.path.exists(PLOTS_DIR):
    os.makedirs(PLOTS_DIR)

def load_dataset(path_or_file):
    if hasattr(path_or_file, 'read'):
        df = pd.read_csv(path_or_file)
    else:
        df = pd.read_csv(path_or_file)
    return df

def preprocess(df, target_col="HiringDecision"):
    df = df.copy()
    if target_col not in df.columns:
        raise ValueError(f"Target column '{target_col}' not found in dataframe")

    df = df.dropna()
    y = df[target_col].astype(int)
    X = df.drop(columns=[target_col])

    X = pd.get_dummies(X, drop_first=True)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=42, stratify=y
    )

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    return X_train_scaled, X_test_scaled, y_train.values, y_test.values, X_test, scaler

def save_confusion_matrix(cm, labels, filename="confusion.png"):
    path = os.path.join(PLOTS_DIR, filename)
    plt.figure(figsize=(6, 4))
    sns.heatmap(cm, annot=True, fmt="d", cmap='Blues', xticklabels=labels, yticklabels=labels)
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.tight_layout()
    plt.savefig(path)
    plt.close()
    return path
