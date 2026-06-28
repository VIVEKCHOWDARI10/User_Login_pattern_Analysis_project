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
            node -v
            npm -v
            npm list jest-junit
            cat package.json
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
