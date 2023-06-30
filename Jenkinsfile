pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('docker_psw')
	}

	stages {

		stage('Build') {

			steps {
                dir('frontend')
                {
                    sh 'pwd'
                    sh 'ls'
                    sh 'docker build -t kavin22/repository_one:frontend .'
                }
                dir('backend')
                {
                    sh 'pwd'
                    sh 'ls'
                    sh 'docker build -t kavin22/repository_one:backend .'
                }
				 
			}
		}

		stage('Login') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

	

		stage('Push') {

			steps {
				sh 'docker push kavin22/repository_one:frontend'
                sh 'docker push kavin22/repository_one:backend'
			}
		}

		//stage('pull'){
			
		//	agent{
		//		label 'slaveNode1'
		//	}
		//	steps{
		//		sh 'sudo docker pull kavin22/repository_one:backend'
		//		sh 'sudo docker pull kavin22/repository_one:frontend'
		//	}
		//}
	}

	post {
		always {
			sh 'docker logout'
		}
	}

}