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
            pwd
            ls
            ls node_modules/react-router-dom
           npm list react-router-dom

           '''
           }
         }
       }
   stage('Unit Testing') {
    steps {
        dir('frontend') {
            sh '''
            export CI=true

            npm test -- --watchAll=false

            echo "Current directory:"
            pwd

            echo "Looking for XML files..."
            find . -name "*.xml"
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
