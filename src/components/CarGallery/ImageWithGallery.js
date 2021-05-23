import React from "react";

const cont = {
  backgroundColor: "#eee",
  overflow: "hidden",
  position: "relative"
};

const ImageWithCaption = ({ index, photo, margin, direction, top, left }) => {
  return (
    <div style={{ margin, height: photo.height, width: photo.width, ...cont }}>
      <img src={photo.src} alt="" width={photo.width} height={photo.height}/>
      <div class="bottom-right overlay-text">{photo.caption}</div>
    </div>
  );
};

export default ImageWithCaption;
