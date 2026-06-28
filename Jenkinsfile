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
      stage (" unit testing ")
         {
           steps 
           {
             dir('frontend') {
             sh '''
             npm install --save-dev jest-junit
             sh 'CI=true npm test -- --watchAll=false'
             '''
             }
           }
         }
       }
       post {
         always {
            junit 'junit.xml'
        }
         success {
           sh ' echo unit tests passed '
     }
  }
}
