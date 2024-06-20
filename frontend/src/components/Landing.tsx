import { useEffect, useRef, useState } from "react"
import { Room } from "./Room";

export const Landing = () => {
    const [name, setName] = useState("");
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [joined, setJoined] = useState(false);

    const getCam = async () => {
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
       
        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]
        setLocalAudioTrack(audioTrack);
        setlocalVideoTrack(videoTrack);
        if (!videoRef.current) {
            return;
        }
        videoRef.current.srcObject = new MediaStream([videoTrack])
        videoRef.current.play();
       
    }

    useEffect(() => {
        if (videoRef && videoRef.current) {
            getCam()
        }
    }, [videoRef]);

    if (!joined) {
            
    return <div className="bg-slate-800">
    <div >

    <div  className=" flex flex-row ">
            <video autoPlay ref={videoRef}></video>
             <div mt-8  justify-center>  
            <input   className="placeholder:italic  placeholder:text-slate-950  border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm  focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Enter your name"  name="search" type="text" onChange={(e) => {
                setName(e.target.value);
            }}>
            </input>
            </div>
          

            <div mt-8  justify-center>
            <button  className="px-8 py-1 text-2xl bg-green-500 hover:bg-green-700 text-white font-bold rounded" onClick={() => {
                setJoined(true);
            }}>Join</button>
            </div>
                
             <div className="flex justify-center">
                        <h1 className="text-4xl font-bold text-white">Let's Connect!</h1>
                    </div>

               </div>
        </div>
        </div>
    }

    return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
}