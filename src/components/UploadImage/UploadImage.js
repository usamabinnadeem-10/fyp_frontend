import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import { Button, Dimmer, Icon, Loader, Segment } from 'semantic-ui-react'
import axios from 'axios';

import './UploadImage.css';

export default function UploadImage(props) {
    const [activeLoader,setActiveLoader] = useState(false);
    const history = useHistory();
    console.log(props);

    const handleClick = ()=>{
        document.getElementById('car-img').click();
        /* setTimeout(()=>{   
            setActiveLoader(false);
            history.push('/checking');
        },4000); */

    }


    const toBase64 = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async function () {
            setActiveLoader(true);
            const images = await axios.post("http://localhost:8000/api/query/",{
                    "query":reader.result
                });
            props.handleImageSet(images.data.result);
            history.push('/locatedCar')
            setActiveLoader(false); 
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const handleImageUpload = async (event)=>{
        event.preventDefault();
        setActiveLoader(true);
        const file = event.target.files[0];
        toBase64(file);
    }

    return (
        <div className="row upload-image-page">
            <Segment basic className='upload-image-page'>
                <Dimmer active={activeLoader} inverted>
                    <Loader inverted content='Running Your Image Through Our Network' />
                </Dimmer>

                <Button animated onClick={handleClick}>
                    <Button.Content>
                        <input type="file" id="car-img" name="car-img" accept="image/*" placeholder="Upload Image" style={{display:'none'}} onChange={event=>handleImageUpload(event)}/>
                        <Button.Content>Upload Image <Icon name='upload right'/></Button.Content>
                    </Button.Content>
                </Button>
                <p>
                    Please upload the image of your query car.
                </p>
                <p>
                    Dankeschon!
                </p>
                            
            </Segment>
                   
        </div>
    )
}
