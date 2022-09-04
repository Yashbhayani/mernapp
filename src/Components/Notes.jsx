import React, { useContext, useState, useEffect, useRef } from "react";
import Notescontex from "../Context/notes/Notescontex";
import Noteitem from "./Noteitem";
import Addnotes from "./Addnotes";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(Notescontex);
  const { notes, Getallnote, Editnotes } = context;
  const navigate = useNavigate();

  useEffect(() => {
    /*if (localStorage.getItem("token")) {
      Getallnote();
    }*/
    localStorage.getItem("token") ? Getallnote() : navigate('/login');
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNotes] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (Cnote) => {
    ref.current.click();
    setNotes({
      id: Cnote._id,
      etitle: Cnote.title,
      edescription: Cnote.description,
      etag: Cnote.tag,
    });
    props.showAlert("Updated Successfully", "success");
  };

  const handelclick = (e) => {
    debugger;
    e.preventDefault();
    console.log(e);
    Editnotes(note.id, note.etitle, note.edescription, note.etag);
    setNotes({
      id: "",
      etitle: "",
      edescription: "",
      etag: "",
    });
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Addnotes showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Notes
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="Notes">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    minLength={5}
                    value={note.etitle}
                    placeholder="Enter title"
                    onChange={onChange}
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
                    id="edescription"
                    name="edescription"
                    minLength={5}
                    value={note.edescription}
                    placeholder="Enter Description"
                    onChange={onChange}
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
                    id="etag"
                    name="etag"
                    value={note.etag}
                    minLength={5}
                    placeholder="Enter tag"
                    onChange={onChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={handelclick}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Update Notes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row my-3">
          <h2>Your Notes</h2>
          <div className="container">
            {notes.length === 0 && "No notes to display"}
          </div>
          {notes.map((note) => {
            return (
              <Noteitem
                key={note._id}
                updateNote={updateNote}
                showAlert={props.showAlert}
                note={note}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
