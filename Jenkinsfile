pipeline {
  agent {
    docker {
      image 'maven:3.9.9-eclipse-temurin-17'
      reuseNode true
    }
  }

  stages {
    stage('Build') {
      steps {
        dir('selenum_demo') {
          sh 'mvn -Dmaven.test.failure.ignore=true clean test'
        }
      }
    }
  }

  post {
    always {
      junit testResults: 'selenum_demo/target/surefire-reports/*.xml', allowEmptyResults: true
    }
  }
}