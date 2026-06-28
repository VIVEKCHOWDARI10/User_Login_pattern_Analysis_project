pipeline {
    agent any
     environment {
        SCANNER_HOME=tool 'sonar-scanner'
    }
    environment {
        IMAGE_NAME = "vivekchowdari10/frontend"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    sh '''
                    npm install
                    '''
                }
            }
        }

        stage('Unit Testing') {
            steps {
                dir('frontend') {
                    sh '''
                    export CI=true

                    JEST_JUNIT_OUTPUT=reports/junit.xml \
                    npm test -- \
                    --watchAll=false \
                    --reporters=default \
                    --reporters=jest-junit
                    '''
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('frontend') {
                    sh '''
                    npm run build
                    '''
                }
            }
        }

      stage('SonarQube Analysis') {
    steps {
        dir('frontend') {
            withSonarQubeEnv('SonarQube') {
                sh '''
                    $SCANNER_HOME/bin/sonar-scanner \
                    -Dsonar.projectName=User_Login_Pattern_Analysis \
                    -Dsonar.projectKey=User_Login_Pattern_Analysis \
                    -Dsonar.sources=src
                '''
            }
        }
    }
}

        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '--scan frontend',
                                odcInstallation: 'owasp'
            }
        }

        stage('Docker Build') {
            steps {
                dir('frontend') {
                    sh '''
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                    docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest
                    '''
                }
            }
        }

        stage('Trivy Scan') {
            steps {
                sh '''
                trivy image ${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', toolName: 'docker') {
                        sh '''
                        docker push ${IMAGE_NAME}:${IMAGE_TAG}
                        docker push ${IMAGE_NAME}:latest
                        '''
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                docker rm -f frontend || true

                docker run -d \
                    --name frontend \
                    -p 3000:80 \
                    ${IMAGE_NAME}:latest
                '''
            }
        }
    }

    post {

        always {
            junit allowEmptyResults: true,
                  testResults: 'frontend/reports/junit.xml'

            dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
        }

        success {
            echo 'Pipeline Completed Successfully.'
        }

        failure {
            echo 'Pipeline Failed.'
        }
    }
}
