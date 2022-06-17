import React, { useState, useEffect } from "react";
import "../style/Admin.css";
import {  useNavigate } from "react-router-dom";
import { auth, storage, db } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useStateValue } from "../context/StateProvider";
import Colors from "./Colors";
import firebase from "./firebase";

function Admin() {
  // color
    const pull_data = (data) => {
      setGradient(data);
    };
  
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
        setEmail("");
        setPassword("");
      })
      .catch((error) => alert(error.message));
  };

  //   Log Out
  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
      setEmail("");
      setPassword("");
    }
  };
  // upload fields
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [gradient, setGradient] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(null);
  const [editset, setEditSet] = useState(null);

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
    if (!id) {
      const file = image;
      const storageRef = ref(storage, `${category}/${image.name}`);
      const metadata = {
        contentType: "image/avif",
      };
      const uploadImage = uploadBytesResumable(storageRef, file, metadata);
      uploadImage.on(
        "state_changed",
        (snapshot) => {
         return snapshot;
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
    } else {
      try {
        updateDoc(doc(db, category, id), {
          name,
          link,
          gradient,
          description,
        });
        setEdit(true)
        setSucess(`website edited successfully`);
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
      } catch {
        console.log(`err`);
      }
    }
  };
  // edit and delete
  const editDb = async (e, id, cat) => {
    setEditSet(true)
    e.preventDefault();
    const editRef = doc(db, cat, id);
    const snapshot = await getDoc(editRef);
    let editdata = { ...snapshot.data(), id: snapshot.id };
    setId(editdata.id);
    setName(editdata.name);
    setGradient(editdata.gradient);
    setLink(editdata.link);
    setDescription(editdata.description);
  };

  const deleteDb = (e, id, cat) => {
    e.preventDefault();
    const deleteRef = doc(db, cat, id);
    if (window.confirm("Are you sure?")) {
      deleteDoc(deleteRef);
      setSucess("Website Deleted");
      setTimeout(() => {
        setSucess("");
      }, 5000);
    }
  };
  // websitelist
  const [shopping, setShopping] = useState([]);
  const [grocery, setGrocery] = useState([]);
  const [travel, setTravel] = useState([]);
  const [pharma, setPharma] = useState([]);
  const [topDeals, setTopDeals] = useState([]);
  const shoppingRef = firebase.firestore().collection("Shopping");
  const groceryRef = firebase.firestore().collection("grocery");
  const travelRef = firebase.firestore().collection("travel");
  const pharmaRef = firebase.firestore().collection("pharma");
  const topDealsRef = firebase.firestore().collection("topDeals");
// Display Items
  useEffect(() => {
    shoppingRef.get().then((collections) => {
      setShopping(
        collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    groceryRef.get().then((collections) => {
      setGrocery(
        collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      travelRef.get().then((collections) => {
        setTravel(
          collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      pharmaRef.get().then((collections) => {
        setPharma(
          collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      topDealsRef.get().then((collections) => {
        setTopDeals(
          collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    });
  }, [sucess, edit]);

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

            <button className="loginButton" type="submit" onClick={signIn}>
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
            onChange={(e) => e.target.value}
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
            <option value="">Choose Category</option>
            <option value="Shopping">Shopping</option>
            <option value="grocery">Grocery</option>
            <option value="pharma">Pharmaceuticals</option>
            <option value="travel">Travel</option>
            <option value="topDeals">TopDeals</option>
          </select>
          <button type="submit"> { editset? "Edit Website" : "Add website"}</button>
          <button onClick={handleAuthenticaton}>Log Out</button>
         
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
       <Colors color={pull_data} />
      </div>
      <div className="adminEdit">
        {user && (
          <div className="webDetails">
            {shopping.map((item) => (
              <form key={item.id} className="adminCard">
                <p style={{ background: item.gradient }}>
                  {" "}
                  <img
                    src={item.img}
                    alt=""
                    style={{ height: "50px", width: "50px" }}
                  />
                </p>
                <p>{item.name}</p>
                <p className="dsc">{item.description}</p>
                <p className="crudLink">{item.link}</p>
                <div className="crudButton">
                  <button
                    onClick={(e) => {
                      editDb(e, item.id, "Shopping");
                    }}
                  >
                    edit
                  </button>
                  <button
                    onClick={(e) => {
                      deleteDb(e, item.id, "Shopping");
                    }}
                  >
                    del
                  </button>
                </div>
              </form>
            ))}

            {travel.map((item) => (
              <form key={item.id} className="adminCard">
                <p style={{ background: item.gradient }}>
                  {" "}
                  <img
                    src={item.img}
                    alt=""
                    style={{ height: "50px", width: "50px" }}
                  />
                </p>
                <p>{item.name}</p>
                <p className="dsc">{item.description}</p>
                <p className="crudLink">{item.link}</p>
                <div className="crudButton">
                  <button
                    onClick={(e) => {
                      editDb(e, item.id, "travel");
                    }}
                  >
                    edit
                  </button>
                  <button
                    onClick={(e) => {
                      deleteDb(e, item.id, "travel");
                    }}
                  >
                    del
                  </button>
                </div>
              </form>
            ))}
            {grocery.map((item) => (
              <form key={item.id} className="adminCard">
                <p style={{ background: item.gradient }}>
                  {" "}
                  <img
                    src={item.img}
                    alt=""
                    style={{ height: "50px", width: "50px" }}
                  />
                </p>
                <p>{item.name}</p>
                <p className="dsc">{item.description}</p>
                <p className="crudLink">{item.link}</p>
                <div className="crudButton">
                  <button
                    onClick={(e) => {
                      editDb(e, item.id, "grocery");
                    }}
                  >
                    edit
                  </button>
                  <button
                    onClick={(e) => {
                      deleteDb(e, item.id, "grocery");
                    }}
                  >
                    del
                  </button>
                </div>
              </form>
            ))}
            {pharma.map((item) => (
              <form key={item.id} className="adminCard">
                <p style={{ background: item.gradient }}>
                  {" "}
                  <img
                    src={item.img}
                    alt=""
                    style={{ height: "50px", width: "50px" }}
                  />
                </p>
                <p>{item.name}</p>
                <p className="dsc">{item.description}</p>
                <p className="crudLink">{item.link}</p>
                <div className="crudButton">
                  <button
                    onClick={(e) => {
                      editDb(e, item.id, "pharma");
                    }}
                  >
                    edit
                  </button>
                  <button
                    onClick={(e) => {
                      deleteDb(e, item.id, "pharma");
                    }}
                  >
                    del
                  </button>
                </div>
              </form>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
