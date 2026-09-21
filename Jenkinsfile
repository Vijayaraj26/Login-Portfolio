pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                echo 'GitHub repository is being checked out...'
            }
        }

        stage('Check Files') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Docker Check') {
            steps {
                sh 'docker --version'
                sh 'docker compose version'
            }
        }

    }
}
