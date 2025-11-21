# Deployment & CI/CD Guide

This project uses a Next.js application structure with different deployment strategies for Staging and Production.

## 🚀 Quick Start (Local Development)

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
3.  **Build for Production**:
    ```bash
    npm run build
    npm start
    ```

---

## 🔄 CI/CD Configuration

The project was originally configured for **GitLab CI**. If you are migrating to GitHub Actions or another provider, you will need to replicate the following workflows.

### 1. Staging Environment
- **Strategy**: Direct deployment via SSH and PM2.
- **Trigger**: Push to `release` branch.
- **Process**:
    1.  SSH into Staging Server.
    2.  Pull latest code.
    3.  Rebuild Next.js app.
    4.  Reload PM2 process.

**Required Secrets/Variables:**
| Variable | Description |
| :--- | :--- |
| `STG_HOST` | Staging server IP address or hostname. |
| `STG_USER` | SSH username for staging server. |
| `STG_PORT` | SSH port (usually 22). |
| `STG_SSH_PRIVATE_KEY` | Private SSH key for authentication. |
| `STG_PATH` | Absolute path to the project directory on the server. |
| `PROJECT_NAME` | PM2 process name (e.g., `chandra-asri-web`). |

### 2. Production Environment
- **Strategy**: Dockerized deployment.
- **Trigger**: Push to `master` (or `main`) branch.
- **Process**:
    1.  SSH into Production Server.
    2.  Pull latest code.
    3.  Build Docker container (`docker compose build`).
    4.  Restart container (`docker compose up -d`).

**Required Secrets/Variables:**
| Variable | Description |
| :--- | :--- |
| `PRD_HOST` | Production server IP address or hostname. |
| `PRD_USER` | SSH username for production server. |
| `PRD_PORT` | SSH port. |
| `SSH_PRIVATE_KEY_PROD` | Private SSH key for authentication. |
| `PRD_PATH` | Absolute path to the project directory on the server. |
| `CONTAINER` | Docker container name to manage. |

---

## 🐳 Docker Setup

The project includes a `Dockerfile` and `docker-compose.yml`.

**Dockerfile Overview:**
- Base Image: `node:20-alpine`
- Exposes Port: `3045`
- Command: `npm start`

**To test Docker locally:**
```bash
docker build -t chandra-asri-web .
docker run -p 3045:3045 chandra-asri-web
```

## 📝 Next Steps for Setup

1.  **Create a new Repository** on GitHub/GitLab.
2.  **Add the Remote Origin**:
    ```bash
    git remote add origin <your-new-repo-url>
    git push -u origin main
    ```
3.  **Configure CI/CD Secrets** in your repository settings matching the table above.
4.  **Verify Access**: Ensure the SSH keys added to secrets have access to the respective servers.
