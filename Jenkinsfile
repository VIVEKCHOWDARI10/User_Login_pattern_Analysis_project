//
pipeline {
  agent any 
     stages {
       stage ("install dependencies  ")
       {
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
            npm test -- --watchAll=false --reporters=default --reporters=jest-junit || true

            echo "===== Reports ====="
            find . -name "*.xml"
            find . -name "junit.xml"
            ls -R
            '''
        }
    }
 }
}
       post {
         always {
           sh 'cat reports/junit.xml'
           junit 'frontend/reports/junit.xml'
        }
         success {
           sh ' echo unit tests passed '
     }
  }
}
