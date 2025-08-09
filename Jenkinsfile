pipeline {
  agent any

  environment {
    AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
    AWS_DEFAULT_REGION = 'your-aws-region'
    S3_BUCKET = 'your-s3-bucket-name'
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
        sh '''
          aws s3 sync out/ s3://$S3_BUCKET/ --delete --acl public-read
        '''
      }
    }
  }
}
