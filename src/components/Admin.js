import React, { useState, useEffect } from "react";
import "../style/Admin.css";
import { storage, db } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Admin() {
  // upload fields
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [gradient, setGradient] = useState("");
  const [image, setImage] = useState(null);

  //image file extension check
  const [imageError, setImageError] = useState("");
  //firebase message
  const [sucess, setSucess] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const [category, setCategory] = useState("");

  // image function
  const types = ["image/avif"];
  const handleImage = (e) => {
    let selectedimg = e.target.files[0];
    if (selectedimg && types.includes(selectedimg.type)) {
      setImage(selectedimg);
      setImageError("");
    } else {
      setImage(null);
      setImageError("please select a valid avif image format file");
      console.log(name, link, description, gradient, image);
    }
  };
  //   file upload function
  const handleUpload = (e) => {
    e.preventDefault();
    const file = image;
    const storageRef = ref(storage, `websitelogo/${image.name}`);
    const metadata = {
      contentType: "image/avif",
    };
    const uploadImage = uploadBytesResumable(storageRef, file, metadata);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        console.log("Uploaded a blob or file!");
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setTimeout(setProgress(progress), 5000);
      },
      (error) => setError(error.message),
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((img) => {
          db.collection("websites")
            .add({
              name,
              description,
              link,
              gradient,
              img,
            })
            .then(() => {
              setSucess(`website added successfully`);
              setDescription("");
              setGradient("");
              setLink("");
              setName("");
              document.getElementById(`imageFile`).value = "";
              setError("");
              setImageError("");
              setTimeout(() => {
                setSucess("");
              }, 3000);
            })
            .catch((error) => setError(error.message));
        });
      }
    );
  };

  return (
    <div className="admin">
      {sucess && (
        <div className="errorText">
          {sucess}
          <br />
        </div>
      )}
      <form className="adminInput" onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Name"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <input
          type="text"
          placeholder="Link"
          required
          onChange={(e) => {
            setLink(e.target.value);
          }}
          value={link}
        />
        <input
          type="text"
          placeholder="Description"
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <input
          type="text"
          placeholder="Gradient"
          required
          onChange={(e) => {
            setGradient(e.target.value);
          }}
          value={gradient}
        />
        <input
          type="file"
          className="imageFile"
          name="image"
          id="imageFile"
          onChange={handleImage}
        />
        <select name="categories" id="categories" onChange={(e)=>{setCategory(e.target.value)}}>
          <option value="websitelogo">Shopping</option>
          <option value="grocery">Grocery</option>
          <option value="pharma">Pharmaceuticals</option>
          <option value="travel">Travel</option>
        </select>

        <button type="submit">Add website</button>
        {imageError && (
          <>
            <div className="errorText">{imageError}</div>
            <br />
          </>
        )}
      </form>

      {error && (
        <>
          <br />
          <div className="errotText">{error}</div>
        </>
      )}
    </div>
  );
}

export default Admin;
