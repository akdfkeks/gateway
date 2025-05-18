## How to setup
Before running the application, make sure you have Docker and Docker Compose installed on your machine.

1. Clone this repository
```bash
git clone {{repo_url}}
```

2. Change directory to the cloned repository
```bash
cd {{repo_name}}
```

3. Run the script to generate environment variables
```bash
chmod +x ./scripts/init.sh # if permission denied
./scripts/init.sh
```

4. Run the script to start all services
```bash
docker-compose up -d
```