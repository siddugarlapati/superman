import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from joblib import dump, load
import os
from utils import preprocess, save_confusion_matrix

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")
if not os.path.exists(MODEL_DIR):
    os.makedirs(MODEL_DIR)

def train_models(df, target_col="HiringDecision"):
    X_train, X_test, y_train, y_test, X_test_df, scaler = preprocess(df, target_col=target_col)

    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000),
        "Random Forest": RandomForestClassifier(n_estimators=200),
        "Neural Net": MLPClassifier(max_iter=1000)
    }

    trained = {}
    for name, model in models.items():
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        report = classification_report(y_test, y_pred, output_dict=True)
        acc = accuracy_score(y_test, y_pred)
        cm = confusion_matrix(y_test, y_pred)
        safe_name = name.replace(' ', '_')
        cm_path = save_confusion_matrix(cm, labels=["Not Hired", "Hired"], filename=f"cm_{safe_name}.png")

        model_path = os.path.join(MODEL_DIR, f"{safe_name}.joblib")
        dump(model, model_path)

        trained[name] = {
            "model_path": model_path,
            "report": report,
            "accuracy": float(acc),
            "confusion_matrix_path": cm_path
        }

    return trained, X_test, y_test

def load_model(path):
    return load(path)
