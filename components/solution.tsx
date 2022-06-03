import React from 'react'
import { mapValue } from 'utils/solver'
import SequenceMap from './sequencemap'

const solution = (
  {
    word,
    sequence,
    lettermap
  } : {
    word: string,
    sequence: mapValue[],
    lettermap: mapValue[]
  }
  ) => {
  return (
    <div className="group relative hover:translate-x-2 hover:z-50 transition-transform hover:cursor-pointer bg-[url('/wordtile.png')] px-[6px] py-[1px] bg-cover text-black font-semibold rounded-[4px] text-md">
      {word}
      <SequenceMap sequence={sequence} letterMap={lettermap} />
      </div>
  )
}

export default solution