pipeline {
  agent any

  environment {
    AWS_DEFAULT_REGION = 'ap-south-1'
    S3_BUCKET = 'www.oinek.org'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build Next.js') {
      steps {
        sh 'npm run build'
        sh 'npm run export'
      }
    }

    stage('Deploy to S3') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'aws-jenkins-creds', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
          sh '''
            export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
            export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
            export AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION
            aws s3 sync out/ s3://$S3_BUCKET/ --delete --acl public-read
          '''
        }
      }
    }
  }
}
