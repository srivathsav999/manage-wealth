pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${env.PATH}"
    }

    triggers {
        pollSCM('H/5 * * * *')
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 60, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Selenium Tests') {
            steps {
                dir('selenum_demo') {
                    sh 'mvn -Dmaven.test.failure.ignore=true -Dheadless=true clean test'
                }
            }
            post {
                always {
                    junit testResults: 'selenum_demo/target/surefire-reports/*.xml', allowEmptyResults: true

                    testNG(reportFilenamePattern: 'selenum_demo/target/surefire-reports/testng-results.xml',
                           showFailedBuilds: true)

                    archiveArtifacts artifacts: 'selenum_demo/target/surefire-reports/**/*', allowEmptyArchive: true
                }
            }
        }

        stage('Cypress Tests') {
            steps {
                dir('cypress-tests') {
                    sh 'npm ci || npm install'
                    sh 'npx cypress run --browser chrome'
                }
            }
            post {
                always {
                    junit testResults: 'cypress-tests/cypress/results/*.xml', allowEmptyResults: true
                    archiveArtifacts artifacts: 'cypress-tests/cypress/videos/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'cypress-tests/cypress/screenshots/**/*', allowEmptyArchive: true
                }
            }
        }
    }

    post {
        success {
            echo 'All tests (Selenium + Cypress) passed successfully!'
        }

        failure {
            echo 'Some tests failed! Check individual stage reports for details.'
        }

        unstable {
            echo 'Tests completed with some failures.'
        }
    }
}