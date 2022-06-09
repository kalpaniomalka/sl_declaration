import _ from 'lodash';
import { Progress } from 'reactstrap';
import React, { useState } from 'react';
//import UploadIcon from '/assets/img/logo1.png';
import axios from "axios";

export const MultiUploader = (props) => {
    const { id, label } = props;

    const [progress, setProgress] = useState(0);
    const [isUploading, setUploading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);

    const onChange = async e => {
        console.log("awaa")
        // let formData = new FormData();
        // setUploadedImages([]);
       // formData.append('file', e.target.files[0]);
    //    _.forEach(e.target.files, file => {
    //        formData.append('files', file);
    //    });
    console.log(e.target.files[0])
       let file = e.target.files[0]
       const data = new FormData();
       data.append('file', file);
       data.append('filename', "aa");

        console.log(data)
       axios({
        url: 'http://localhost:5000/checkItems',
        method: "POST",
        data:data
    }).then((response) => {
       console.log(response)
    });
    //    console.log(formData)
         setUploading(true);
    //     let { data } = await axios.post('http://localhost:5000/checkMammogram', formData, {
    //         onUploadProgress: ({ total, loaded }) => {
    //             setProgress(((loaded / total) * 100).toFixed(2));
    //         }
    //     });
        setUploading(false);
        setProgress(0);
      //  setUploadedImages(data);
        
    }

    return (
        <div className='form-group'>
            <br/>
            <label htmlFor={id} 
            className="text-promary font-weight-bold font-size-sm">
                Upload Your Files
            </label>
            <div className='d-flex'>
                <div>
                    <input
                        id={id}
                        multiple
                        type="file"
                        onChange={onChange}
                        className='form-control uploaded-input'
                    />
                    <div className="uploaded-mask d-flex justify-content-center
                    align-items-center">
                        <img src="/assets/img/logo1.png" alt='upload_icons' className='upload-icon'/>
                    </div>
                </div>
                {
                    isUploading ? (
                        <div className='flex-grow-1 mx-3'>
                            <div className="text-center">{progress}%</div>
                            <Progress value={progress}/>
                        </div>
                    ) : null
                }
            </div>
            <div className="d-flex flex-wrap">
                {
                    uploadedImages.length ? uploadedImages.map(uploadedImage => (
                        <img 
                            key={uploadedImage}
                            src={uploadedImage} 
                            alt="Uploaded_Image"
                            className="mr-2 img-fluid img-thumbnail uploaded-img"/>
                    )):null
                }
            </div>
        </div>
    )
}