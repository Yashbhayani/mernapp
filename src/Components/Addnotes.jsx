import React, { useContext, useState } from "react";
import Notescontex from "../Context/notes/Notescontex";

const Addnotes = (props) => {
  const context = useContext(Notescontex);
  const { Addnote } = context;

  const [note, setNotes] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handelclick = (e) => {
    debugger;
    e.preventDefault();
    Addnote(note.title, note.description, note.tag);
    setNotes({ title: "", description: "", tag: "" });
    props.showAlert("Added Successfully", "success")
  };

  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3">
        <h2>Add Notes</h2>
        <form id="Notes">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter title"
              onChange={onChange}
              minLength={5}
              value={note.title}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Enter Description"
              onChange={onChange}
              minLength={5}
              value={note.description}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              placeholder="Enter tag"
              onChange={onChange}
              minLength={5}
              value={note.tag}
              required
            />
          </div>
          <button
            type="submit"
            disabled={note.title.length < 5 || note.description.length < 5}
            className="btn btn-primary"
            onClick={handelclick}
          >
            Add Notes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnotes;
