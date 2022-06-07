import React, { useState, useEffect } from "react";
import "../style/Admin.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, storage, db } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useStateValue } from "../context/StateProvider";
import Colors from "./Colors";

function Admin() {
  //Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ user }] = useStateValue();
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate("/admin");
        console.log("logged in");
      })
      .catch((error) => alert(error.message));
  };

  //   Log Out
  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };
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
    const storageRef = ref(storage, `${category}/${image.name}`);
    const metadata = {
      contentType: "image/avif",
    };
    const uploadImage = uploadBytesResumable(storageRef, file, metadata);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        console.log("Uploaded a blob or file!");
      },
      (error) => setError(error.message),
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((img) => {
          db.collection(category)
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
      {!user && (
        <div className="login">
          <form>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

              <button className="loginButton"
                type="submit"
                onClick={signIn}
              >
                SignIn
              </button>
          </form>
        </div>
      )}
      <div className="errorContainer">
        {sucess && (
          <div className="errorText">
            {sucess}
            <br />
          </div>
        )}
      </div>
      {user && (
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
          <select
            name="categories"
            id="categories"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="websitelogo">Shopping</option>
            <option value="grocery">Grocery</option>
            <option value="pharma">Pharmaceuticals</option>
            <option value="travel">Travel</option>
          </select>

          <button type="submit">Add website</button>
          <button  onClick={handleAuthenticaton}  >Log Out</button>
          {imageError && (
            <>
              <div className="errorText">{imageError}</div>
              <br />
            </>
          )}
        </form>
      )}
      <div>
        {error && (
          <>
            <br />
            <div className="errotText">{error}</div>
          </>
        )}
      </div>
      <div className="colors">
        <Colors />
      </div>
      
    </div>
  );
}

export default Admin;
