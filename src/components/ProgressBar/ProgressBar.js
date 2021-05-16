import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Progress } from 'semantic-ui-react';

import './ProgressBar.css';

export default function ProgressBar({image64}) {
    const [percent,setPercent] = useState(30);
    const history  = useHistory();


    useEffect(()=>{
        if(image64===""){
            history.push('/');
        }
        const imageProcessing = ()=>{
            setTimeout(()=>{
               if(percent === 100) history.push("/locatedCar");
               setPercent(percent + (100%percent) )
            },4000);
        }
        imageProcessing();
    },[percent,history,image64]);
    
    return (
        <div className="container progress-bar-page">
            <h1>{percent}%</h1>
            <Progress percent={percent} indicating />
            <p>Running your image through our network...</p>
        </div>
    )
}
