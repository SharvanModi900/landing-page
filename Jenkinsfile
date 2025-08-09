// pipeline {
//     agent any
//     environment {
//         NVM_DIR = "$HOME/.nvm"
//     }
//     stages {
//         stage('Install Node') {
//             steps {
//                 sh '. "$NVM_DIR/nvm.sh" && nvm install 24.3.0 && nvm use 24.3.0'
//             }
//         }
//         stage('Install Dependencies') {
//             steps {
//                 sh '. "$NVM_DIR/nvm.sh" && nvm use 24.3.0 && npm install --legacy-peer-deps'
//             }
//         }
//         stage('Build') {
//             steps {
//                 sh '. "$NVM_DIR/nvm.sh" && nvm use 24.3.0 && npm run build'
//             }
//         }
//     }
// }


pipeline {
    agent any
    environment {
        NVM_DIR = "$HOME/.nvm"
        S3_BUCKET = "www.oinek.org"
        AWS_REGION = "ap-south-1" // change to your region
    }
    stages {
        stage('Install Node') {
            steps {
                sh '. "$NVM_DIR/nvm.sh" && nvm install 24.3.0 && nvm use 24.3.0'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh '. "$NVM_DIR/nvm.sh" && nvm use 24.3.0 && npm install --legacy-peer-deps'
            }
        }
        stage('Build') {
            steps {
                sh '. "$NVM_DIR/nvm.sh" && nvm use 24.3.0 && npm run build'
            }
        }
        stage('Deploy to S3') {
            steps {
                sh '''
                aws s3 sync out/ s3://$S3_BUCKET --region $AWS_REGION --delete
                '''
            }
        }
    }
}
