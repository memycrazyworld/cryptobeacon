import { useEffect, useRef, useState } from 'react';
import './my.css'

function App() {
  const [iscomplateScreen, setScreen] = useState(false);
  const [allTodo, setAlltodo] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewdescription] = useState("");
  const [completeTodolist, setComplateTodo] = useState([]);
  const titleref = useRef(null);
  const descriptionref = useRef(null);
  const [time, setTime] = useState();
  
  const currenttime = () => {
    let nowtime = new Date().toLocaleTimeString();
    setTime(nowtime);
  } 

  setInterval(currenttime,1000)

  const add = () => {
    if(newTitle !== ""){
      let newTodoItem = {
        title: newTitle,
        description: newDescription
      }
      var updateTodoItems = [...allTodo];
      updateTodoItems.push(newTodoItem);
      setAlltodo(updateTodoItems);
      console.log(updateTodoItems);
      localStorage.setItem('todolist', JSON.stringify(updateTodoItems));
  
      titleref.current.value = "";
      descriptionref.current.value = "";
    }else{
      alert("can't add with null title")
    }
  }

  const deletebtn = (index) => {
    let redeusTodo = [...allTodo];
    redeusTodo.splice(index,1);

    localStorage.setItem('todolist',JSON.stringify(redeusTodo))
    setAlltodo(redeusTodo);
  }

  const handlecomplate = (index) => {
    let now = new Date();
    let day = now.getDate();
    let mn = now.getMonth();
    let yy = now.getFullYear();
    let hr = now.getHours();
    let min = now.getMinutes();

    let todocompleteTime = day + "-" + mn + "-" + yy + "/" + hr + "-" + min;

    let filterditem = {
      ...allTodo[index],
      completeTime:todocompleteTime
    }

    let updatecomplatetodo = [...completeTodolist];
    updatecomplatetodo.push(filterditem);
    setComplateTodo(updatecomplatetodo);
    console.log(completeTodolist)
    localStorage.setItem("completetodolist" , JSON.stringify(updatecomplatetodo));
    deletebtn(index);

  }

  const deletecomplatebtn = (index) =>{
    let redeuscomplateTodo = [...completeTodolist];
    redeuscomplateTodo.splice(index,1);

    localStorage.setItem('completetodolist',JSON.stringify(redeuscomplateTodo))
    setComplateTodo(redeuscomplateTodo)
  }
  useEffect(() => {
    let savecompletetodo = JSON.parse(localStorage.getItem('completetodolist'));
    if(savecompletetodo){
      setComplateTodo(savecompletetodo);
    }else{
      console.log("errorr")
    }
  },[])

  useEffect(() =>{
    let savedtodo = JSON.parse(localStorage.getItem('todolist'));
    if(savedtodo){
      setAlltodo(savedtodo);
    }
  },[]);


  return (
    <div className="container">
      <div className='box'>
        <div className='row  justify-content-center'>
          <h2>Todo List</h2>
          
        </div>
        <p className='align-self-center justify-content-center'>Time: {time}</p>
        <div className='row input-group'>
          <div className='col-5 d-flex flex-column'>
            <label>Todo Name</label>
            <input className='form-control' ref={titleref} onChange={(e) => setNewTitle(e.target.value)} placeholder='Title of the task'></input>
          </div>
          <div className='col-5 d-flex flex-column '>
            <label>Todo Description</label>
            <input className='form-control' ref={descriptionref} onChange={(e) => setNewdescription(e.target.value)} placeholder='Description on the task'></input>
          </div>
          <div className='col-2 align-self-end'>
            <button className='btn add-btn' onClick={add}>Add</button>
          </div>
        </div>
        <hr></hr>
        <div className='row pt-2'>
          <div className='col-12 '>
            <div className='btn-group'>
              <button className={`btn btn2-c ${iscomplateScreen === false && "active"} `}
                type='button' onClick={() => setScreen(false)}>Todo</button>
              <button className={`btn btn2-c ${iscomplateScreen === true && "active"}`}
                type='button' onClick={() => setScreen(true)}>Completed</button>
            </div>
          </div>
        </div>

          <div className='todo-list overflow-scroll' style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              {iscomplateScreen === false && allTodo.map((item, index) => {
                return (
                  <div className='justify-content-center ' key={index}>
                    <div className='d-flex justify-content-between todo-list-item '>
                      <div className='flex-1'>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div >
                      <div className='flex-2 icons align-self-center'>
                        <i class="fa-solid fa-trash delete" onClick={()=>deletebtn(index)}></i>
                        <i class="fa-solid fa-check check-item" onClick={() => handlecomplate(index)}></i>
                      </div>
                    </div>
                  </div>
                );
            })}


            {iscomplateScreen === true && completeTodolist.map((item, index) => {
                return (
                  <div className='justify-content-center ' key={index}>
                    <div className='d-flex justify-content-between todo-list-item'>
                      <div className='flex-1'>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p><small>{item.completeTime}</small></p>
                      </div >
                      <div className='flex-2 icons align-self-center'>
                        <i class="fa-solid fa-trash delete" onClick={()=>deletecomplatebtn(index)}></i>
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>  

       
      </div>
    </div>
  );
}

export default App;
