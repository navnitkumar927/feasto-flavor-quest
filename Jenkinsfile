```groovy
pipeline {
    agent any

    environment {
        APP_NAME = 'feasto-flavor-quest'
        CONTAINER_NAME = 'feasto-flavor-quest'
        APP_PORT = '3000'
        SONAR_PROJECT_KEY = 'feasto-flavor-quest'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
        skipDefaultCheckout(false)
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                sh '''
                    echo "Node:"
                    node --version || true

                    echo "Bun:"
                    bun --version

                    echo "Docker:"
                    docker --version

                    echo "Docker Compose:"
                    docker compose version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    echo "Installing dependencies..."
                    bun install --frozen-lockfile
                '''
            }
        }

        stage('Lint') {
            steps {
                sh '''
                    echo "Running ESLint..."
                    bun run lint
                '''
            }
        }

        stage('Build Test') {
            steps {
                sh '''
                    echo "Building application..."
                    bun run build

                    echo "Checking production server output..."
                    test -f .output/server/index.mjs
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                          -Dsonar.sources=. \
                          -Dsonar.exclusions=node_modules/**,.output/**,.git/**
                    '''
                }
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                sh '''
                    echo "Running dependency security check..."

                    if command -v dependency-check.sh >/dev/null 2>&1; then
                        dependency-check.sh \
                          --project "${APP_NAME}" \
                          --scan . \
                          --format HTML \
                          --out dependency-check-report \
                          --disableNodeAudit
                    else
                        echo "OWASP Dependency-Check CLI not installed."
                        echo "Skipping this stage for now."
                    fi
                '''
            }
        }

        stage('Trivy Filesystem Scan') {
            steps {
                sh '''
                    echo "Running Trivy filesystem scan..."

                    if command -v trivy >/dev/null 2>&1; then
                        trivy fs \
                          --severity HIGH,CRITICAL \
                          --exit-code 0 \
                          --no-progress \
                          .
                    else
                        echo "Trivy is not installed."
                        exit 1
                    fi
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    echo "Building Docker image..."

                    docker build \
                      -t ${APP_NAME}:${BUILD_NUMBER} \
                      -t ${APP_NAME}:latest \
                      .
                '''
            }
        }

        stage('Trivy Docker Image Scan') {
            steps {
                sh '''
                    echo "Scanning Docker image..."

                    trivy image \
                      --severity HIGH,CRITICAL \
                      --exit-code 0 \
                      --no-progress \
                      ${APP_NAME}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "Deploying application..."

                    docker compose up -d --build

                    echo "Waiting for application..."
                    sleep 15

                    docker compose ps
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    echo "Checking application health..."

                    for i in 1 2 3 4 5; do
                        if curl -fsS http://127.0.0.1:3000/ > /dev/null; then
                            echo "Application is healthy."
                            exit 0
                        fi

                        echo "Application not ready. Attempt $i/5..."
                        sleep 5
                    done

                    echo "Application health check failed."
                    docker compose logs --tail=100
                    exit 1
                '''
            }
        }
    }

    post {
        success {
            echo '''
            ==========================================
            DEPLOYMENT SUCCESSFUL
            ==========================================
            Application: feasto-flavor-quest
            URL: http://44.201.155.10
            Container: feasto-flavor-quest
            ==========================================
            '''
        }

        failure {
            echo '''
            ==========================================
            PIPELINE FAILED
            ==========================================
            Check the Jenkins console output.
            ==========================================
            '''

            sh '''
                docker compose ps || true
                docker compose logs --tail=100 || true
            '''
        }

        always {
            echo 'Pipeline completed.'
        }
    }
}
```
