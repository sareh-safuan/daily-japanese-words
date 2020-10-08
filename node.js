// jlpt, Vocab-kana, Vocab-expression, Vocab-meaning
// Sentence-expression, Sentence-kana, Sentence-meaning

const fs = require('fs')

fs.readFile('./w_one.json', (err, data) => {
    if (err) throw err

    const temp = JSON.parse(data)
    const filter = temp.map(f => {
        return {
            level: f['jlpt '],
            vPos: f['Vocab-pos'],
            vKana: f['Vocab-kana'],
            vExp: f['Vocab-expression'],
            vMean: f['Vocab-meaning'],
            sKana: f['Sentence-kana'],
            sExp: f['Sentence-expression'],
            sMean: f['Sentence-meaning']
        }
    })

    const level5 = filter.filter(f => f.level === "JLPT4").map(l => ({...l, level: 5}))
    const level4 = filter.filter(f => f.level === "JLPT3").map(l => ({...l, level: 4}))
    const level3 = filter.filter(f => f.level === "JLPT2").map(l => ({...l, level: 3}))
    const level2 = filter.filter(f => f.level === "JLPT1").map(l => ({...l, level: 2}))
    const level1 = filter.filter(f => f.level === "JLPT0").map(l => ({...l, level: 1}))
    const words = [
        ...level5,
        ...level4,
        ...level3,
        ...level2,
        ...level1
    ]

    fs.writeFile('words.json', JSON.stringify(words), (err) => {
        console.log('done')
    })
})