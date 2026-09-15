pipeline {
    agent any

    environment {
        APP_NAME = "feasto-flavor-quest"
        PATH = "/var/lib/jenkins/.bun/bin:/usr/local/bin:/usr/bin:/bin"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Environment Check') {
            steps {
                sh '''
                    echo "Bun:"
                    bun --version

                    echo "Git:"
                    git --version

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
                    bun install --frozen-lockfile
                '''
            }
        }

        stage('Lint') {
            steps {
                sh '''
                    bun run lint
                '''
            }
        }

        stage('Build Test') {
            steps {
                sh '''
                    bun run build
                    test -f .output/server/index.mjs
                    echo "Build successful"
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'SonarQube analysis will run here'
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                echo 'OWASP Dependency Check will run here'
            }
        }

        stage('Trivy Filesystem Scan') {
            steps {
                echo 'Trivy filesystem scan will run here'
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build \
                        -t ${APP_NAME}:latest \
                        .
                '''
            }
        }

        stage('Trivy Docker Image Scan') {
            steps {
                echo 'Trivy Docker image scan will run here'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker compose up -d --build
                    docker compose ps
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 10
                    curl -f http://127.0.0.1:3000/
                    echo
                    echo "Application health check successful"
                '''
            }
        }
    }

    post {
        success {
            echo '''
==========================================
FEASTO DEPLOYMENT SUCCESSFUL
==========================================
Application:
http://44.201.155.10
==========================================
'''
        }

        failure {
            echo '''
==========================================
FEASTO PIPELINE FAILED
==========================================
'''
            sh '''
                docker compose ps || true
                docker compose logs --tail=100 || true
            '''
        }
    }
}
