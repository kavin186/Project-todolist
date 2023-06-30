import React from "react";
import { useState } from "react";
import axios from "axios";
import "./index.css";
import Component2 from "./Component2";
import { useEffect } from "react";
export default function Component1() {
  const [Username, setUsername] = useState("");
  function getinputValuea(event) {
    setUsername(event.target.value);
  }
  const [Task, settask] = useState("");
  function getinputValueb(event) {
    settask(event.target.value);
  }

  //check command
  const [updated, setUpdated] = useState([]);
  //const [id,setId] = useState("")
  const [notcompleted, setnotcompleted] = useState([]);
  async function getTasks() {
    console.log("test");
    await axios.get("http://localhost:3000/tasks").then((response) => {
      setUpdated(
        response.data.filter((i) => {
          return i.completed === true;
        })
      );
      console.log("updated", updated);
      setnotcompleted(
        response.data.filter((i) => {
          return i.completed === false;
        })
      );
      console.log("notcompleted", notcompleted);
    });
  }
  useEffect(() => {
    getTasks();
  }, []);

  function create() {
    axios
      .post("http://localhost:3000/task", {
        name: Username,
        task: Task,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(Username);
    console.log(Task);
  }

  return (
    <div>
      <h2 className="bies"> TO-DO- LIST </h2>
      <div class="container">
        <div class="column">
          <h2 class="p"> Enter username and task </h2>
          <p className="bie">
            <label>Username : </label>
            <input type="text" onChange={getinputValuea} />
            <br></br>
            <br></br>
            <label className="st">&nbsp;&nbsp;&nbsp;Task : </label>
            <input type="text" onChange={getinputValueb} />
            <br />
            <br></br>
            <Component2 name="add" display={create} /> &nbsp;
          </p>
        </div>

        <div class="column">
          <p1 className="hi">
            <h2> Tasks to be done </h2>
            {notcompleted.map((data) => (
              <div class="containers">
                <div class="columns">{data.name} </div>
                <div class="columns"> {data.task} </div>
                <div class="columns">
                  <Component2
                    name="update"
                    display={() => {
                      axios.patch(`http://localhost:3000/task/${data.id}`);
                      getTasks();
                    }}
                  />
                </div>
                <div class="columns">
                  <Component2
                    name="delete"
                    display={() => {
                      axios.delete(`http://localhost:3000/task/${data.id}`);
                      getTasks();
                    }}
                  />
                </div>
              </div>
            ))}
          </p1>
        </div>

        <div class="column">
          <p2 className="hi">
            <h2> Completed Tasks </h2>

            {updated.map((data) => (
              <div class="containers">
                <div class="columns">{data.name} </div>
                <div class="columns"> {data.task} </div>
                <div class="columns"> completed</div>
                <div class="columns">
                  <Component2
                    name="delete"
                    display={() => {
                      axios.delete(`http://localhost:3000/task/${data.id}`);
                    }}
                  />
                </div>
              </div>
            ))}
          </p2>
        </div>
      </div>
    </div>
  );
}
