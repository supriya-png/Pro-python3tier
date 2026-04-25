pipeline {
    agent any

    environment {
        DOCKER_USER = "supriya9820"
        VERSION = "v${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/supriya-png/pro-python3tier.git'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t $DOCKER_USER/python3tier-backend:latest ./backend'
                sh 'docker tag $DOCKER_USER/python3tier-backend:latest $DOCKER_USER/python3tier-backend:$VERSION'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t $DOCKER_USER/python3tier-frontend:latest ./frontend'
                sh 'docker tag $DOCKER_USER/python3tier-frontend:latest $DOCKER_USER/python3tier-frontend:$VERSION'
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {

                    sh 'echo $PASS | docker login -u $USER --password-stdin'

                    sh 'docker push $DOCKER_USER/python3tier-backend:latest'
                    sh 'docker push $DOCKER_USER/python3tier-backend:$VERSION'

                    sh 'docker push $DOCKER_USER/python3tier-frontend:latest'
                    sh 'docker push $DOCKER_USER/python3tier-frontend:$VERSION'
                }
            }
        }

	stage('Deploy to Kubernetes') {
            steps {
        	sh '''
        	  kubectl rollout restart deployment backend
        	  kubectl rollout restart deployment frontend

        	  kubectl rollout status deployment backend
        	  kubectl rollout status deployment frontend
                   '''
    		}
        }		
   }

    post {
        success {
            echo "Build Success"
        }

        failure {
            echo "Build Failed"
        }
    }
}
