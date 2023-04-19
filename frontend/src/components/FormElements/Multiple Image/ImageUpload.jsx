import { useState } from "react";

import classes from "./ImageUpload.module.css";

const ImageUpload = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState([]);

  const fileSelectHandler = (e) => {
    const files = e.target.files;
    const images = [...files];
    const previewUrl = [];

    if (images.length !== 0) {
      images.map((file) => {
        const imageUrl = URL.createObjectURL(file);
        previewUrl.push({ name: file.name, imageUrl });
        return setImagePreviewUrl(previewUrl);
      });
    }

    setSelectedFiles([...files]);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        name="image"
        accept=".jpg,.png,.jpeg"
        onInput={fileSelectHandler}
        onChange={props.imageChangeHandler}
      />
      {selectedFiles.length > 0 && (
        <div>
          <h2>Selected Files:</h2>
          <ul className={classes.selected_images}>
            {imagePreviewUrl.map((file) => (
              <li key={file.name}>
                <p>{file.name}</p>
                <img src={file.imageUrl} alt={file.name} width="100px" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
