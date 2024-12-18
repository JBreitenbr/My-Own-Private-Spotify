import {useEffect, useState} from 'react';
import {Tooltip} from 'react-tooltip';
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
fetch(`https://raw.githubusercontent.com/JBreitenbr/Spoti-Data/refs/heads/main/TracksData/${bandName}.json`)
      .then((res) => res.json())
      .then((data) => setTracks(data))
  },[bandName]);

const bandTracks=
tracks.map(
(item,index) => {
  let songs=item.album_tracks.split(")/"); let med=Math.floor(songs.length/2);
  let songs1=songs.slice(0,med+songs.length%2); let songs2=songs.slice(med+songs.length%2);
return (
 <><li key={item.track}><div className="ml-4 mb-4">
<Tooltip id={`my-anchor-element-${index}`}>
  <div className="flex flex-col mb-4"><div className="flex flex-row mx-2 mt-4 justify-center items-center" style={{width:"80vw"}}><img src={item.album_pic} className="h-32 w-32 sm:h-40 sm:w-40 lg:h-56 lg:w-56 m-2"/><div style={{minWidth:"55vw"}}><div className="text-base sm:text-xl mx-2 mt-2">{item.artist}</div><div className="text-base sm:text-xl mx-2">{item.album_name}</div><div className="text-base sm:text-xl mx-2">{item.album_date}</div><div className="mx-2 text-xs text-wrap">{item.genres}</div></div></div><div className="mt-2 text-xs" style={{fontSize:"9px"}}><div className="text-wrap flex"><ol>{songs1.map((item)=><li className="text-wrap" style={{maxWidth:"50vw"}}>{item+")"}</li>)}</ol><ol className="ml-4" start={med+songs.length%2+1}>{songs2.map((item)=><li className="text-wrap">{item+")"}</li>)}</ol></div></div></div>
</Tooltip><a data-tooltip-id={`my-anchor-element-${index}`}><img src={item.album_pic} className="h-20 w-20 sm:h-32 sm:w-32" style={{border:"1px solid #0f172a"}}/></a><div className="text-base sm:text-xl md:text-2xl xl:text-3xl mt-2 text-white">{item.track}</div></div></li></>)})
  return (
    <div className="generale bg-slate-500" style={{position:"relative"}}>
     <div className="bg-slate-300 flex flex-col" style={{position: "sticky",top:"0px",width:"100vw"}}>
<h3 className="text-white text-center text-3xl h-32 pt-8 mb-6 bg" >My Own Private Spotify</h3>
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