pipeline {
  agent any

  environment {
    AWS_ACCESS_KEY_ID = credentials('AKIAY5L4MPD27WXULBGA')
    AWS_SECRET_ACCESS_KEY = credentials('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')
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
        sh '''
          aws s3 sync out/ s3://$S3_BUCKET/ --delete --acl public-read
        '''
      }
    }
  }
}
