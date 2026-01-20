# Heart-Disease-Risk-Prediction

## Problem Statement
Cardiovascular diseases (CVDs) are the leading cause of death globally, claiming approximately 17.9 million lives each year. Early detection and prediction of heart disease risk can significantly improve patient outcomes. However, training accurate ML models traditionally requires centralizing sensitive patient data, raising serious privacy concerns and regulatory challenges (HIPAA, GDPR).

This project addresses this challenge by implementing a hospital-centric federated learning approach that enables collaborative model training across multiple healthcare institutions without sharing raw patient data. The system operates without a centralized admin authority - global model aggregation occurs automatically through the federated averaging (FedAvg) process.

## Architecture

### Hospital-Only Federated Learning Flow

1. **Hospital Login & Access**: Authorized hospital staff securely log in to access the system
2. **Local Data Management**: Each hospital manages its own patient data locally - data never leaves the institution
3. **Local Model Training**: Hospitals train models on their local datasets independently
4. **Model Parameter Sharing**: Only trained model parameters (weights) are shared with the federation layer
5. **Automated Global Aggregation**: The federated aggregation service automatically combines model parameters using FedAvg
6. **Global Model Distribution**: The aggregated global model is redistributed to all participating hospitals
7. **Enhanced Predictions**: Hospitals use both local and global models for comprehensive risk assessment

### Key Features

- **No Centralized Admin**: System operates through automated federated aggregation - no human administrator required
- **Hospital-Centric Design**: All operations managed at the hospital level
- **Privacy-Preserving**: Patient data remains local; only model parameters are exchanged
- **HIPAA-Aligned**: Architecture aligns with healthcare privacy regulations
- **Collaborative Intelligence**: Benefits from collective knowledge without data sharing


**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

