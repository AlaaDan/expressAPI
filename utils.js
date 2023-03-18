function filterPlays(insults, play){
    const result = insults.filter((insult)=>{
        const p = insult.play.toLowerCase()
        if (p.includes(play.toLowerCase)){
            return insult;
        }
    })
    return result
}

module.exports = { filterPlays }