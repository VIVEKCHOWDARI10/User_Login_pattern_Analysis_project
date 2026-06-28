pipeline {
    agent any
     environment {
        SCANNER_HOME=tool 'sonar-scanner'
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
    stage("SonarQube Analysis") {
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

stage("Quality Gate") {
    steps {
        script {
            waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token'
        }
    }
}

        
       stage("Docker Build & Push"){
            steps{
                dir('frontend'){
                script{
                   withDockerRegistry(credentialsId: 'docker', toolName: 'docker'){   
                       sh "docker build -t frontend ."
                       sh "docker tag frontend  vivekchowdari/frontend:latest "
                       sh "docker push vivekchowdari/frontend:latest "
                    }
                 }
                }
            }
        }
        stage("TRIVY"){
            steps{
                sh "trivy image vivekchowdari/frontend:latest > trivyimage.txt" 
            }
        }

        
        
        stage('Run Docker Container') {
            steps {
                sh '''
                docker rm -f frontend || true

                docker run -d \
                    --name frontend \
                    -p 3000:80 \
                    frontend:latest
                '''
            }
        }
    }

    post {

        always {
            junit allowEmptyResults: true,
                  testResults: 'frontend/reports/junit.xml'

        }

        success {
            echo 'Pipeline Completed Successfully.'
        }

        failure {
            echo 'Pipeline Failed.'
        }
    }
}
