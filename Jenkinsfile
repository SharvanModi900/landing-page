pipeline {
    agent any

    environment {
        NVM_DIR = "$HOME/.nvm"
        PATH = "$NVM_DIR/versions/node/v24.3.0/bin:$PATH"
        AWS_DEFAULT_REGION = "ap-south-1"
        S3_BUCKET = "your-s3-bucket-name"
    }

    stages {
        stage('Setup Node') {
            steps {
                sh '''
                export NVM_DIR="$HOME/.nvm"
                [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                nvm use 24.3.0
                node -v
                npm -v
                '''
            }
        }

        stage('Install dependencies') {
            steps {
                sh '''
                export NVM_DIR="$HOME/.nvm"
                [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                nvm use 24.3.0
                npm install
                '''
            }
        }

        stage('Build Next.js') {
            steps {
                sh '''
                export NVM_DIR="$HOME/.nvm"
                [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                nvm use 24.3.0
                npm run build
                npm run export
                '''
            }
        }

        stage('Deploy to S3') {
            steps {
                sh '''
                aws s3 sync out/ s3://$S3_BUCKET --delete
                '''
            }
        }
    }
}
