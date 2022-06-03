export interface mapValue {
    char: string;
    xPos: number;
    yPos: number;
}

export interface solutiontype {
    word: string;
    sequence: mapValue[]
}

export const exampleMap = "shiihrtunoaeteno"

export const charactersToMap = (boggle: string) => {
    let chars = boggle.split("")
    if (chars.length !== 16) return []
    const charMap: mapValue[] = chars.map((char, i) => {
        if (i < 4) {
            return {
                char: char,
                xPos: i,
                yPos: 0
            }
        } else if (i < 8) {
            return {
                char: char,
                xPos: i - 4,
                yPos: 1
            }
        } else if (i < 12) {
            return {
                char: char,
                xPos: i - 8,
                yPos: 2
            }
        } else {
            return {
                char: char,
                xPos: i - 12,
                yPos: 3
            }
        }
    })
    return charMap
}

export const findAdjacents = (letterMap: mapValue[], currentSeq: mapValue[]) => {
        return letterMap
        .filter(adVal => (Math.abs(adVal.xPos - currentSeq[currentSeq.length-1].xPos) < 2 && Math.abs(adVal.yPos - currentSeq[currentSeq.length-1].yPos) < 2 && !isInSequence(adVal, currentSeq)))
}

export const isInSequence = (val: mapValue, sequence: mapValue[]) => {
    let doesContain = false
    sequence.forEach(s => {
        if (s.xPos == val.xPos && s.yPos == val.yPos) {
            doesContain = true
        }
    })
    return doesContain
}

export const makeNextSequences = (letterMap: mapValue[], currentSequence:mapValue[]) => {
    let adjacents = findAdjacents(letterMap, currentSequence)
    let possibleSequences: mapValue[][] = []
    adjacents.forEach(adjacent => {
        let temp = currentSequence.concat(adjacent)
        possibleSequences.push(temp)
    })

    return possibleSequences
}

export const findWordInMap = (word: string, letterMap: mapValue[] | null) => {
    if (!letterMap) return
    const letters = word.split("")
    let sequences: mapValue[][] = []
    let current: string = letters[0]
    letterMap.forEach(letter => {
        if (letter.char == current) {
            sequences.push([letter])
        }
    })
    if (sequences.length < 1) {
        return null
    } else {
        letters.shift()
        letters.forEach((letter, i) => {
            let possibleSequences: mapValue[][] = []
            sequences.forEach(sequence => {
                let temp = makeNextSequences(letterMap, sequence)
                possibleSequences = possibleSequences.concat(temp)
            })
            let t = possibleSequences.filter(seq => seq[seq.length-1].char == letter)
            sequences = t
        })
    }

    if (sequences.length < 1) {
        return null
    } else {
        return sequences
    }
}