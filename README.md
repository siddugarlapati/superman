# Quantum-Enhanced AI Auditor

A revolutionary platform that combines quantum computing, homomorphic encryption, and advanced machine learning to provide provable fairness auditing for AI models at scale.

## Features

- **Quantum Speed**: Exponentially faster bias detection using quantum algorithms
- **Privacy-Preserving**: Homomorphic encryption ensures model privacy during auditing
- **Provable Certificates**: Cryptographically signed fairness certificates with public verification
- **Real-time Monitoring**: Live monitoring of AI fairness auditing operations
- **Professional UI**: Modern, responsive interface with comprehensive dashboards

## Project Structure

```
├── backend/                 # Python Flask API
│   ├── app.py              # Main Flask application
│   ├── auditing.py         # AI fairness auditing logic
│   ├── model_training.py   # Model training utilities
│   ├── utils.py            # Utility functions
│   ├── requirements.txt    # Python dependencies
│   └── recruitment_data.csv # Sample dataset
├── src/                    # React frontend
│   ├── components/         # Reusable React components
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   └── App.css           # Global styles
├── public/                # Static assets
└── package.json          # Node.js dependencies
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask server:
   ```bash
   python app.py
   ```

The backend will be available at `http://127.0.0.1:5000`

### Frontend Setup

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### POST /audit
Submit a model for fairness auditing.

**Request Body:**
- `file`: CSV file containing the dataset (multipart/form-data)

**Response:**
```json
{
  "model_name": {
    "accuracy": 0.87,
    "quantum_bias_score": 0.73,
    "robustness_flip_fraction": 0.34,
    "confusion_matrix_url": "/plots/confusion_matrix.png"
  }
}
```

## Pages Overview

1. **Landing Page** - Hero section showcasing quantum-safe AI auditing
2. **Dashboard** - Real-time KPIs, timeline charts, and incident monitoring
3. **Submit Audit** - File upload with encryption progress and audit options
4. **Model Explorer** - Browse and filter audit results
5. **Audit Detail** - Comprehensive audit results with certificates
6. **Real-time Monitor** - Live metrics and threat detection
7. **Certificate Repository** - Public certificate verification
8. **Documentation** - Technical documentation and API reference

## Technology Stack

### Backend
- **Flask** - Python web framework
- **scikit-learn** - Machine learning library
- **pandas** - Data manipulation
- **matplotlib/seaborn** - Data visualization
- **Flask-CORS** - Cross-origin resource sharing

### Frontend
- **React** - JavaScript UI library
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **CSS3** - Modern styling with gradients and animations

## Professional Color Palette

- **Primary Blue**: #1e3a8a
- **Secondary Blue**: #1e40af
- **Success Green**: #059669
- **Warning Orange**: #d97706
- **Error Red**: #dc2626

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue on GitHub.