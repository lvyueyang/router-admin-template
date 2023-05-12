pipeline {
 
    agent any
    
    environment {
        _wx_web_hook = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=88740cdf-7e83-48b7-8049-3e4cb1ced1ff"
    }
    
    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '',
            artifactNumToKeepStr: '',
            daysToKeepStr: '7',
            numToKeepStr: '15')
    }
    
    
    stages {
        stage('安装依赖') {
            steps {
                sh '''
                  yarn
                '''
            }
        }

        stage('打包') {
            steps {
                sh 'npm run build'
            }
        }
        
    }
    
    post {
        success {
            sh """
                curl "${_wx_web_hook}" \
                    -H 'Content-Type: application/json' \
                    -d '{
                            "msgtype": "markdown",
                            "markdown": {
                                "content": "## ${JOB_NAME} 打包成功  
                                    >[任务详情](${BUILD_URL})"
                            }
                    }'
            """
        }
        failure {
            sh """
                curl "${_wx_web_hook}" \
                    -H 'Content-Type: application/json' \
                    -d '{
                            "msgtype": "markdown",
                            "markdown": {
                                "content": "## ${JOB_NAME} 打包失败   
                                    >[失败原因](${BUILD_URL}/console)"
                            }
                    }'
            """
        }
    }
}