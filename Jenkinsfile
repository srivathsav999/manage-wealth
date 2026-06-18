pipeline {
    agent any

    triggers {
        // Poll SCM every 5 minutes for changes
        pollSCM('H/5 * * * *')
        // GitHub webhook trigger
        githubPush()
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 60, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                // Source Code Management - Git/GitHub
                checkout scm
            }
        }

        stage('Selenium Tests') {
            agent {
                docker {
                    image 'maven:3.9.9-eclipse-temurin-17'
                    reuseNode true
                }
            }
            steps {
                dir('selenum_demo') {
                    // Always run mvn clean test
                    sh 'mvn -Dmaven.test.failure.ignore=true -Dheadless=true clean test'
                }
            }
            post {
                always {
                    // TestNG Reports Analyzer
                    junit testResults: 'selenum_demo/target/surefire-reports/*.xml', allowEmptyResults: true

                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'selenum_demo/target/surefire-reports',
                        reportFiles: 'index.html',
                        reportName: 'TestNG Report'
                    ])

                    archiveArtifacts artifacts: 'selenum_demo/target/surefire-reports/**/*', allowEmptyArchive: true
                }
            }
        }

        stage('Cypress Tests') {
            agent {
                docker {
                    image 'cypress/browsers:latest'
                    reuseNode true
                }
            }
            steps {
                dir('cypress-tests') {
                    sh 'npm ci'
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
            echo '✅ All tests (Selenium + Cypress) passed successfully!'
        }

        failure {
            echo '❌ Some tests failed! Check individual stage reports for details.'
            // Uncomment to enable email notifications:
            // mail to: 'your-email@example.com',
            //      subject: "FAILED: ManageMoney Tests - Build #${env.BUILD_NUMBER}",
            //      body: "Tests failed. Check: ${env.BUILD_URL}"
        }

        unstable {
            echo '⚠️ Tests completed with some failures.'
        }

        cleanup {
            cleanWs()
        }
    }
}