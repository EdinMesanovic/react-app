import { useState, useEffect } from "react";
import { update, read, insert, remove } from "../services/apiService";

const Student = ({ match, history }) => {
  const [id] = useState(match.params.id);

  const [student, setStudent] = useState({
    _id_: "0",
    firstName: "",
    lastName: "",
    yearOfBirth: 0,
    address: "",
  });

  useEffect(() => {
    if (id !== "0") {
      read("students", id, (data) => {
        if (data) setStudent(data);
      });
    }
  }, [id]);

  function changeHolder(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  function back() {
    history.push("/students");
  }

  function save() {
    student._id = undefined;
    if (id === "0") {
      insert("students", student, (data) => {
        if (data) return history.push("/students");
        console.log("There was an error during saving data");
      });
    } else {
      update("students", id, student, (data) => {
        if (data) return history.push("/students");
        console.log("There was an error during saving data");
      });
    }
  }

  function del() {
    remove("students", id, (data) => {
      history.push("/students");
    });
  }

  return (
    <div className='container'>
      <h1>Student</h1>
      <form className='input-form'>
        <div style={{ margin: "12px" }}>
          <label htmlFor='name'>First name: </label>
          <input
            type='text'
            name='firstName'
            value={student.firstName}
            onChange={changeHolder}
            required
          ></input>
        </div>
        <div style={{ margin: "12px" }}>
          <label htmlFor='name'>Last name: </label>
          <input
            type='text'
            name='lastName'
            value={student.lastName}
            onChange={changeHolder}
            required
          ></input>
        </div>
        <div style={{ margin: "12px" }}>
          <label htmlFor='name'>Year of Birth: </label>
          <input
            type='text'
            name='yearOfBirth'
            value={student.yearOfBirth}
            onChange={changeHolder}
          ></input>
        </div>
        <div style={{ margin: "12px" }}>
          <label htmlFor='name'>Address: </label>
          <input
            type='text'
            name='address'
            value={student.address}
            onChange={changeHolder}
          ></input>
        </div>
        <hr />
        {id !== "0" && (
          <div className='leftBtn'>
            <button type='button' onClick={del}>
              DELETE
            </button>
          </div>
        )}
        <div className='rightBtn'>
          <button type='button' onClick={back}>
            BACK
          </button>
          &nbsp;&nbsp;
          <button type='button' onClick={save}>
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Student;
