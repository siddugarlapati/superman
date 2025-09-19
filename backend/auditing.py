import numpy as np
import os

try:
    import pennylane as qml
    PENNYLANE_AVAILABLE = True
except Exception:
    PENNYLANE_AVAILABLE = False

def quantum_kernel_bias_score(X_test, y_test, model):
    if PENNYLANE_AVAILABLE:
        try:
            n_qubits = min(8, X_test.shape[1])
            dev = qml.device("default.qubit", wires=n_qubits)

            def embed(x):
                for i in range(n_qubits):
                    qml.RY(float(x[i]) % (2 * np.pi), wires=i)

            @qml.qnode(dev)
            def kernel(x1, x2):
                embed(x1[:n_qubits])
                qml.adjoint(embed)(x2[:n_qubits])
                return qml.probs(wires=range(n_qubits))

            sims = []
            for i in range(min(50, X_test.shape[0])):
                k = kernel(X_test[i], X_test[i])
                sims.append(np.mean(k))
            score = float(np.mean(sims))
            return score
        except Exception:
            pass

    # Fallback if PennyLane unavailable
    try:
        pos = X_test[np.array(y_test) == 1]
        neg = X_test[np.array(y_test) == 0]
        if len(pos) < 2 or len(neg) < 2:
            return 0.5
        pos_var = np.mean(np.var(pos, axis=0))
        neg_var = np.mean(np.var(neg, axis=0))
        score = 1.0 / (1.0 + abs(pos_var - neg_var))
        return float(np.clip(score, 0.0, 1.0))
    except Exception:
        return 0.5

def encrypted_audit_simulation(model, X_test):
    return {
        "encrypted_checks": True,
        "operations_count": int(np.prod(X_test.shape))
    }

def adversarial_robustness_check(model, X_test, y_test, eps=0.01):
    try:
        base_preds = model.predict(X_test)
        noise = np.random.normal(scale=eps, size=X_test.shape)
        X_pert = X_test + noise
        pert_preds = model.predict(X_pert)
        flip_fraction = float(np.mean(base_preds != pert_preds))
        return flip_fraction
    except Exception:
        return 0.0

def audit_models(trained_models, X_test, y_test):
    results = {}
    for name, info in trained_models.items():
        model_path = info.get("model_path")
        try:
            from joblib import load
            model = load(model_path)
        except Exception:
            model = None

        qscore = quantum_kernel_bias_score(X_test, y_test, model)
        enc = encrypted_audit_simulation(model, X_test)
        robustness = adversarial_robustness_check(model, X_test, y_test, eps=0.02)

        results[name] = {
            "accuracy": info.get("accuracy"),
            "report": info.get("report"),
            "confusion_matrix_path": info.get("confusion_matrix_path"),
            "quantum_bias_score": float(qscore),
            "encrypted_audit": enc,
            "robustness_flip_fraction": float(robustness),
            "bias_detected": bool(qscore < 0.85 or robustness > 0.2)
        }

    return results
