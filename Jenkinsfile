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


// pipeline {
//     agent any
//     environment {
//         NVM_DIR = "$HOME/.nvm"
//         PATH = "/usr/local/bin:${env.PATH}"
//         AWS_DEFAULT_REGION = 'ap-south-1'
//         S3_BUCKET = 'www.oinek.org'
//     }
//     stages {
//         stage('Setup AWS CLI') {
//             steps {
//                 sh '''
//                     if ! command -v aws &> /dev/null
//                     then
//                         echo "Installing AWS CLI..."
//                         curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
//                         unzip awscliv2.zip
//                         sudo ./aws/install
//                     else
//                         echo "AWS CLI already installed"
//                     fi
//                 '''
//             }
//         }
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
//         stage('Build & Export') {
//             steps {
//                 sh '. "$NVM_DIR/nvm.sh" && nvm use 24.3.0 && npm run build && npm run export'
//             }
//         }
//         stage('Deploy to S3') {
//             environment {
//                 AWS_ACCESS_KEY_ID = credentials('aws-access-key')  // from Jenkins credentials
//                 AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')
//             }
//             steps {
//                 sh '''
//                     export PATH="/usr/local/bin:$PATH"
//                     aws s3 sync out/ s3://$S3_BUCKET --region $AWS_DEFAULT_REGION --delete
//                 '''
//             }
//         }
//     }
// }


pipeline {
    agent any

    environment {
        NVM_DIR = "$HOME/.nvm"
        PATH = "/usr/local/bin:${env.PATH}"
        AWS_DEFAULT_REGION = 'ap-south-1'
        S3_BUCKET = 'www.oinek.org'
    }

    stages {
        stage('Setup AWS CLI') {
            steps {
                sh '''
                    if ! command -v aws &> /dev/null
                    then
                        echo "Installing AWS CLI..."
                        curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
                        unzip -q awscliv2.zip
                        sudo ./aws/install
                    else
                        echo "AWS CLI already installed"
                    fi
                '''
            }
        }

        stage('Install Node.js') {
            steps {
                sh '''
                    . "$NVM_DIR/nvm.sh"
                    nvm install 24.3.0
                    nvm use 24.3.0
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    . "$NVM_DIR/nvm.sh"
                    nvm use 24.3.0
                    npm ci || npm install --legacy-peer-deps
                '''
            }
        }

        stage('Build ') {
            steps {
                sh '''
                    . "$NVM_DIR/nvm.sh"
                    nvm use 24.3.0
                    npm run build
                   
                '''
            }
        }

        // stage('Deploy to S3') {
        //     environment {
        //         AWS_ACCESS_KEY_ID = credentials('aws-access-key')
        //         AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')
        //     }
        //     steps {
        //         sh '''
        //             export PATH="/usr/local/bin:$PATH"
        //             aws s3 sync out/ s3://$S3_BUCKET --region $AWS_DEFAULT_REGION --delete
        //         '''
        //     }
        // }
        stage('Deploy to S3') {
    steps {
        withCredentials([
            string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
            string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
        ]) {
            sh '''
                export PATH="/usr/local/bin:$PATH"
                aws s3 sync .next/export/ s3://$S3_BUCKET --region $AWS_DEFAULT_REGION --delete
            '''
        }
    }
}


    }
}
