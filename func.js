const https = require('https')

module.exports = {
    get() {
        return new Promise((resolve, reject) => {
            https.get('https://quality.data.gov.tw/dq_download_json.php?nid=120450&md5_url=02bd6ba50ef7d355cb8cd9e8685bec1c', (res) => {
                const { statusCode } = res
                const contentType = res.headers['content-type']

                console.log('回應標頭：\n\n', res.headers, '\n')

                let error

                if (statusCode !== 200) {
                    error = new Error('請求失敗！\n' +
                                      `狀態碼： ${statusCode}`)
                } else if (!/^application\/json/.test(contentType)) {
                    error = new Error('錯誤的回應內容類型！\n' +
                                      `預期為 application/json 卻收到 ${contentType}！`)
                }

                if (error) {
                    console.error(error.message)
                    res.resume()
                    reject(error)
                    return
                }

                res.setEncoding('utf8')

                let rawData = ''

                res.on('data', (chunk) => {
                    rawData += chunk
                })

                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData)
                        resolve(parsedData)
                    } catch (e) {
                        reject(e)
                    }
                })
            }).on('error', (e) => {
                reject(e)
            })
        })
    }
}
