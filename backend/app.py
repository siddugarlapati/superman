from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from model_training import train_models
from auditing import audit_models
from utils import load_dataset

app = Flask(__name__)
CORS(app)

PLOTS_DIR = os.path.join(os.path.dirname(__file__), 'static_plots')

@app.route('/plots/<path:filename>')
def serve_plot(filename):
    return send_from_directory(PLOTS_DIR, filename)

@app.route('/audit', methods=['POST'])
def run_audit():
    if 'file' in request.files:
        file = request.files['file']
        df = load_dataset(file)
    else:
        sample = os.path.join(os.path.dirname(__file__), 'recruitment_data.csv')
        df = load_dataset(sample)

    trained, X_test, y_test = train_models(df, target_col='HiringDecision')
    results = audit_models(trained, X_test, y_test)

    host = request.host_url.rstrip('/')
    for m, info in results.items():
        cm_path = info.get('confusion_matrix_path')
        if cm_path:
            fname = os.path.basename(cm_path)
            info['confusion_matrix_url'] = f"{host}/plots/{fname}" if host else f"/plots/{fname}"

    return jsonify(results)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return ("Quantum Audit Backend is running. Use /audit endpoint to POST a CSV file.")

if __name__ == '__main__':
    app.run(port=5000, debug=True)
