import React, { useState } from "react";
import Notescontex from "./Notescontex";
import { io } from "socket.io-client";

// const soket = io.connect("http://localhost:5000")

const NotesState = (props) => {
  const host = "http://localhost:5000";
  const notesIntial = [];
  const [notes, setNotes] = useState(notesIntial);
  const [Username, setUsername] = useState();

  //Getall notes
  const Getallnote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnots`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    // soket.on()
    const json = await response.json();
    setNotes(json.notes);
    setUsername(json.name);
  };

  //Add notes
  const Addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    setNotes(notes.concat(json));
  };

  //Edit notes
  const Editnotes = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenots/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  //Deleter notes
  const Deleternotes = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <Notescontex.Provider
      value={{ notes, Username, Getallnote, Addnote, Editnotes, Deleternotes }}
    >
      {props.children}
    </Notescontex.Provider>
  );
};

export default NotesState;
