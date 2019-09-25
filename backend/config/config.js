var config = {
    dev: {
        database: {
            mongodb: 'mongodb://localhost:27017/transperfect'
        }
    }
}

exports.get = function (env) {
    return config[env] || config['dev']
}
