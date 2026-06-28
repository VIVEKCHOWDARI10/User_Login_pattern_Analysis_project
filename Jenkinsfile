pipeline {
    agent any

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

                    echo "Current Directory:"
                    pwd

                    echo "JUnit files:"
                    find . -name "*.xml"

                    echo "Contents of reports/junit.xml:"
                    cat reports/junit.xml || true
                    '''
                }
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: 'frontend/reports/junit.xml'
        }

        success {
            echo 'Unit Tests Passed'
        }

        failure {
            echo 'Unit Tests Failed'
        }
    }
}
