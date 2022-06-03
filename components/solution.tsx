import React from 'react'
import { mapValue } from 'utils/solver'

const solution = (
  {
    word,
    sequence
  } : {
    word: string,
    sequence: mapValue[]
  }
  ) => {
  return (
    <div className="group-hover bg-[url('/wordtile.png')] px-[6px] py-[1px] bg-cover text-black font-semibold rounded-[4px] text-md">
      {word}
      </div>
  )
}

export default solution