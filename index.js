const func = require('./func.js')

const tools = {
    fetch() {
        func.get()
            .then((jsonData) => {
                console.log('回應結果：\n\n', jsonData, '\n')
            })
            .catch((e) => {
                console.error(e)
            })
    }
}

tools.fetch()
