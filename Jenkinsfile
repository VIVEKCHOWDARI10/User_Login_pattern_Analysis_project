//
pipeline {
  agent any 
     stages {
       stage ("install dependencies  ")
       {
         steps {
           sh '''
           npm install
           '''
         }
      stage (" unit testing ")
         {
           steps 
           {
             sh '''
             npx jest --ci --reporters=default --reporters=jest-junit
             '''
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
