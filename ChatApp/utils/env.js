const env = {
    mongo: "mongodb+srv://admin:admin@shopdb-ykzx1.mongodb.net/chat?retryWrites=true",
    google:{
        clientID: '850799622536-op6envk0c16jajulg9iu5ab5am2vnetu.apps.googleusercontent.com',
        clientSecret: '1tbXwjEzasRB1ZLEa1LpuTOp'

         
    },
    facebook: {
        clientID: '368435974025219',
        clientSecret: '2407901202c4ebde185a8d9dbf958856'

    }, 
    session:{
        cookieKey: 'mykeycanbeanything'
    }
}
module.exports = env;