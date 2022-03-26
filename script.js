const { translate } = require('free-translate');
const fs = require('fs')

const readStream = fs.createReadStream('./input.txt')

const asyncIterator = async (readeble) => {
    for await (const chank of readeble) {
        console.log(chank)
        const translateTextToEnglish = await translate(chank, { from: 'ru', to: 'en' })
        const translateTextToJapanse = await translate(chank, { from: 'ru', to: 'zh-CN' })
        console.log(translateTextToEnglish)
        const writeFile = (filename, translateTo) => {
            new Promise((resolve, reject) => {
                fs.writeFile(filename, translateTo, (err, data) => {
                    if (err) {
                        return reject(err)
                    }
                    resolve(data)
                })
            })
        }
        writeFile('en.translate.txt', translateTextToEnglish)
        writeFile('cn.translate.txt', translateTextToJapanse)
    }
}

asyncIterator(readStream)