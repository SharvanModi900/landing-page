pipeline {
    agent any
    environment {
        NVM_DIR = "$HOME/.nvm"
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
    }
}
