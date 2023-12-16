import { useState, useEffect } from "react";
import DefImages from "./DefImages";
import Header from "./Header";
import Images from "./Images";

export default function Controls() {
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState(10);
  const [inputData, setImputData] = useState({
    width: "",
    height: "",
    grayscale: false,
    blur: false,
  });

  useEffect(() => {
    const fecthImages = async () => {
      const res = await fetch(`https://picsum.photos/v2/list?page=2&limit=100`);
      const data = await res.json();
      setImages(data);
    };
    fecthImages();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setImputData((prevInputData) => {
      return {
        ...prevInputData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  const width = inputData.width;
  const height = inputData.height;
  let defDim = width === "" && height === "";

  function addImages() {
    setVisible((prevVisible) => prevVisible + 5);
  }

  function changeDef() {
    defDim
      ? setImputData((prevInputData) => {
          return {
            ...prevInputData,
            width: "200",
            height: "200",
          };
        })
      : setImputData((prevInputData) => {
          return {
            ...prevInputData,
          };
        });
  }

  function showMoreImages() {
    changeDef();
    addImages();
    console.log(defDim);
  }

  return (
    <main className="main--container">
      <Header />
      <div className="form">
        <h4 className="form-title">Image Options:</h4>
        <div className="form--field_group">
          <div className="form--field">
            <label htmlFor="width">Width</label>
            <input
              className="form--input_text"
              type="text"
              name="width"
              id="width"
              onChange={handleChange}
              value={inputData.width}
            />
          </div>
          <div className="form--field">
            <label htmlFor="height">Height</label>
            <input
              className="form--input_text"
              type="text"
              name="height"
              id="height"
              onChange={handleChange}
              value={inputData.height}
            />
          </div>
        </div>
        <div className="form--field_group">
          <div className="switch--container">
            <label htmlFor="grayscale" className="switch--label">
              Grayscale
              <div className="switch">
                <input
                  type="checkbox"
                  id="grayscale"
                  name="grayscale"
                  checked={inputData.grayscale}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </div>
            </label>
          </div>
          <div className="switch--container">
            <label htmlFor="blur" className="switch--label">
              Blur
              <div className="switch">
                <input
                  type="checkbox"
                  id="blur"
                  name="blur"
                  checked={inputData.blur}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="images--container">
        {defDim ? (
          <div className="gallery--grid">
            {images.slice(0, 5).map((image, index) => (
              <DefImages
                key={image.id}
                defWidth="200"
                defDim={defDim}
                index={index}
                {...image}
                {...inputData}
              />
            ))}
          </div>
        ) : (
          <div className="gallery--flex">
            {images.slice(0, visible).map((image) => (
              <Images
                key={image.id}
                index={image.id}
                defWidth="200"
                defDim={defDim}
                {...image}
                {...inputData}
              />
            ))}
          </div>
        )}
      </div>
      <button className="form--button" onClick={showMoreImages}>
        Show more images
      </button>
    </main>
  );
}
