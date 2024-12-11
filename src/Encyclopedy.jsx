import {useEffect, useState} from 'react';
import {bandsDict} from './bandsDict';
const Encyclopedy = () => {
let [letter, setLetter]=useState()
  let [bands, setBands]=useState([])
  let [bandName, setBandName]=useState("none");
  let [tracks, setTracks]=useState([])
  function handleLetter(e){
    setLetter(e.target.value)
    setBands(bandsDict.find(item=>item.name===e.target.value).bands)
  }
  function handleBand(e){
    setBandName(e.target.value)
  }

useEffect(() =>{
fetch(`https://raw.githubusercontent.com/JBreitenbr/Jason/refs/heads/main/TracksData/${bandName}.json`)
      .then((res) => res.json())
      .then((data) => setTracks(data))
  },[bandName]);

const bandTracks=
tracks.map(
(item,index) => {
return (
 <><li key={item.track}><div className="ml-4 mb-4"><img src={item.album_pic} className="h-20 w-20 sm:h-32 sm:w-32" style={{border:"1px solid #0f172a"}}/><div className="small-text sm:text-xl md:text-2xl xl:text-3xl mt-4 text-white">{item.track}</div><div>{item.album_date}</div><div>{item.album_type}</div><div className="text-xs">{item.genres}</div><div style={{fontSize:"6px"}} ><ol>{item.album_tracks.split(")/").map((item,index)=><li>{item+")"}</li>)}</ol></div></div></li></>)})
  return (
    <div className="generale bg-slate-500" style={{position:"relative"}}>
     <div className="bg-slate-300 flex flex-col" style={{position: "sticky",top:"0px",width:"100vw"}}>
<h3 className="text-white text-center text-4xl h-32 pt-8 mb-6 test" >My Own Private Spotify</h3>
      <select className="mx-8 sm:mx-32 sm:h-6 sm:text-xl" onChange={handleLetter}>
      <option>--Select Letter--</option>
        {bandsDict.map(item=>
          <option key={item.name}>{item.name}</option>
        )}
      </select>
      <select className="mb-6 mx-8 sm:mx-32 sm:h-6 sm:text-xl" onChange={handleBand}>
        <option>--Select Artist--</option>
        {bands.map(item=>
          <option key={item.name}>{item.name}</option>
        )}</select></div><br/>
      {bandName=="none"?<div className="spoti mt-7 sm:mt-36"></div>:<ul className="grid grid-cols-2">{bandTracks}</ul>}
    </div>
  )
}

export default Encyclopedy;