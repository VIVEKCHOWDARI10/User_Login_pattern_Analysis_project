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
             npx jest --ci --reporters=default --reporters=jest-junit
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
