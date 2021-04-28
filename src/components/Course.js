import { useEffect, useState } from "react";
import { update, read, insert } from "../services/apiService";

const Course = ({ match, history }) => {
  const [id] = useState(match.params.id);

  const [course, setCourse] = useState({
    _id: "0",
    name: "",
    points: 0,
  });

  useEffect(() => {
    if (id !== "0") {
      read("courses", id, (data) => {
        if (data) {
          setCourse(data);
        }
      });
    }
  }, [id]);

  function changeHandler(e) {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  }

  const back = () => {
    history.push("/courses");
  };

  const save = () => {
    course._id = undefined;
    if (id === "0") {
      insert("courses", course, (data) => {
        if (data) return history.push("/courses");
        console.log("There was an error during saving data");
      });
    } else {
      update("courses", id, course, (data) => {
        if (data) return history.push("/courses");
        console.log("There was an error during saving data");
      });
    }
  };

  return (
    <div className='container'>
      <h2>Course</h2>
      <form className='input-form'>
        <div style={{ margin: "12px" }}>
          <label htmlFor='name'>Course name: </label>
          <input
            type='text'
            name='name'
            value={course.name}
            onChange={changeHandler}
          />
        </div>
        <div style={{ margin: "12px" }}>
          <label htmlFor='points'>Course points: </label>
          <input
            type='text'
            name='points'
            value={course.points}
            onChange={changeHandler}
          />
        </div>
        <hr />
        <div className='leftBtn'>
          <button type='button'>DELETE</button>
        </div>
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

export default Course;
