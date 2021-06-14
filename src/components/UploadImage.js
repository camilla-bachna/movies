import { useState } from 'react';

function UploadImage(props) {
  const [image, setImage] = useState('');
  const cover = props.cover;
  const setCover = props.setCover;

  const uploadImage = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'cloudinary-media');
    data.append('cloud_name', 'camilla-bachna');
    fetch('  https://api.cloudinary.com/v1_1/camilla-bachna/image/upload', {
      method: 'post',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCover(data.url);
      })
      .catch((error) => console.log(error));
  };
  console.log(cover);
  return (
    <div>
      <div>
        <label className="form-label" htmlFor="movieImage">
          Imagen de la película:
        </label>
        <input
          className="form-input"
          id="movieImage"
          type="text"
          placeholder="Imagen"
          value={cover}
          onChange={(ev) => setCover(ev.target.value)}
        />

        <input
          type="file"
          onChange={(ev) => setImage(ev.target.files[0])}
        ></input>
        <button onClick={uploadImage} className="form-button">
          Subir imagen
        </button>
        <div>
          {' '}
          <img className="form-image" src={cover}></img>
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
