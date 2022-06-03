import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { findWordInMap, charactersToMap,solutiontype } from "utils/solver";
import { sowpods } from "dictionary";
import Solution from "@components/solution";
import VerificationInput from "react-verification-input";
import AuthCode from 'react-auth-code-input';

const Home: NextPage = () => {
  const [wordMap, setWordMap] = useState<string>("")
  const [solutions, setSolutions] = useState<solutiontype[]>([])

  useEffect(() => {
    if (wordMap.length < 16) return
    let sowpodDictionary = sowpods.toLowerCase().split("\n")
    let solutionList: solutiontype[] = []
    sowpodDictionary.forEach(word => {
      if (word.length < 3) return
      let a = findWordInMap(word, charactersToMap(wordMap.toLowerCase()))
      if (!a) return
      if (a.length > 1) {
        solutionList.push({
          word: word,
          sequence: a[0]
        })
      }
    })
    solutionList.sort((a,b) => {
      if (a.word.length < b.word.length) {
        return 1
      }
      if (a.word.length > b.word.length) {
        return -1
      }
      return 0
    })
    setSolutions(solutionList)
  }, [wordMap])
  return (
    <div className="flex py-10 pt-0 md:pt-10 text-white w-screen h-full px-6 md:px-0">
      <div className="flex flex-col text-center m-auto">
        <div className="flex flex-col max-w-xl">
          <div className="flex bg-white flex-col gap-1 pt-6">
            <span className="text-black font-bold text-4xl">Word Hunt Solver</span>
            <span className="text-[#5D945C] text-xl">fill in the grid to find all the words</span>
          </div>
          <img className="flex -translate-y-1" src="paper.png" alt="" />
        </div>
        <span className="text-center text-[#D6EDD5] mt-6">if this helps you beat your friends give me a follow on twitter</span>
        <span className="text-white text-center font-bold">@bvvst</span>
        <div className="flex md:flex-row flex-col gap-4 mt-6">
          <div className="flex md:flex-col">
          <AuthCode length={16} inputClassName="w-16 h-16 rounded-md text-black text-center font-bold text-[44px] uppercase bg-[url('/tile.png')] bg-contain drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]"
        containerClassName="grid grid-cols-4 gap-3 p-3 bg-[#495D45] border-4 border-[#A4E693] rounded-xl mx-auto"
        onChange={e => setWordMap(e)} />
          </div>
        
        <div className="flex flex-grow bg-[#355434] rounded-lg p-2 px-3 md:mx-0 mx-auto">
          <div className="flex flex-col gap-1">
          <span className=" uppercase text-[#9BB69A] font-bold">
            {solutions.length} words found
          </span>
        {solutions.map((sol, i) => (
          <div className="flex" key={i}>
            <Solution word={sol.word} sequence={sol.sequence} ></Solution>

          </div>
        ))}
          </div>
        
        </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default Home;
