import React from 'react'
import { isInSequence, mapValue } from 'utils/solver'

const sequencemap = (
    {
        sequence,
        letterMap
    }:{
        sequence:mapValue[]
        letterMap:mapValue[]
    }
) => {
  return (
    <div className='absolute top-0 right-0 translate-x-12 translate-y-8 hidden group-hover:flex z-50'>
        <div className='grid grid-cols-4 shrink-0 bg-white p-3 rounded-md gap-0.5'>
            {letterMap.map((letter,i) => {
                if (letter.char == sequence[0].char && letter.xPos == sequence[0].xPos && letter.yPos == sequence[0].yPos) {
                    return (
                <Sequencemaptile key={i} letter={letter.char} tileColor="bg-[#FBDF7C]" />
                    )
                } else if (isInSequence(letter, sequence)) {
                    return (
                        <Sequencemaptile key={i} letter={letter.char} tileColor="bg-[#EDD1A8]" />
                                    )
                } else {
                    return (
                        <Sequencemaptile key={i} letter={letter.char} tileColor="" />
                    )
                }
            } )}
        </div>  
    </div>
  )
}

const Sequencemaptile = (
    {
        letter,
        tileColor
    } : {
        letter:string
        tileColor: string
    }
) => {

    return (
        <div className={`w-6 h-6 shrink-0 rounded-sm text-black font-bold ${tileColor}`}>
            <span className='m-auto text-center uppercase'>{letter}</span>
        </div>
    )
}

export default sequencemap