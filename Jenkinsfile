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
            export JEST_JUNIT_OUTPUT_DIR=reports
            export JEST_JUNIT_OUTPUT_NAME=junit.xml
            npm test -- --watchAll=false --reporters=default --reporters=jest-junit
            '''
        }
    }
 }
}
       post {
         always {
           junit 'frontend/reports/junit.xml'
        }
         success {
           sh ' echo unit tests passed '
     }
  }
}
