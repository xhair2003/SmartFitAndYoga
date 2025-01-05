<div align="center">
  <h1>SmartFit &amp; Yoga - AI powered personalized fitness and yoga training system</h1>
  <img src="https://github.com/user-attachments/assets/218e7f5c-2f1d-4529-be9e-a396dae00f31" alt="logo" />
</div>

## Information

<div align="center">
  <p>
    <strong>SmartFit & Yoga</strong> is an AI-powered platform offering personalized fitness and yoga training programs.  
    It integrates advanced AI models to provide <strong>meal planning</strong>, <strong>workout recommendations</strong>, and <strong>real-time feedback</strong> tailored to each user's unique needs.
  </p>
</div>

## Install

This guide will walk you through the steps to clone and set up this project.

### Prerequisites

Ensure you have the following tools installed on your machine:

- **Git**: For cloning the repository.
- **Node.js & npm**: For managing frontend &amp; backend dependencies and running the React app.
- **Mongodb Atlas &amp; Compass**: Database server to store application data.

### 1. Clone the Repository

First, clone the project repository:

```bash
git clone https://github.com/xhair2003/SmartFitAndYoga.git <project_folder>
cd <project_folder>
```

Then, make sure you are on the right branch before modify source:

```bash
git checkout <branch_name>
```

### 2. Set Up the Backend (Node.js)

1. **Navigate to the root directory**:

```bash
cd server
```

2. **Install all required dependencies:**:

```bash
npm install
```

3. **Run the Node.js Development Server**:

```bash
npm run dev
```

The server will be available at `http://127.0.0.1:5000`.

### 3. Set Up the Model AI (Python)

1. **Navigate to the model directory**:

```bash
cd model
```

2. **Install the required Python packages using requirements.txt:**:

```bash
pip install -r requirements.txt
```

3. **Run the Python development**:

 - For the "meal" model:

```bash
py meal.py
```

This model will be available at `http://localhost:5001`.

- For the "workout" model:

```bash
py workout.py
```

This model will be available at `http://localhost:6000`.

### 4. Set Up the Frontend (React)

1. **Navigate to the client directory**:

```bash
cd client
```

2. **Install the required dependencies**:

```bash
npm install
```

3. **Run the React development server**:

```bash
npm start
```

The frontend should be available at `http://localhost:3000`.

> [!NOTE]
> `3000` is default port that frontend running, may different in orther comupter, run twice times, or orther conditions.

### 5. Other

> [!WARNING]
> Additional setup instructions and conventions will be provided in the README files located within the source directories. Please refer to these files before taking any further actions.
