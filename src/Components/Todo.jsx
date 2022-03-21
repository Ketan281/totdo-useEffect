import React from "react";

const Todo = () =>{
    const [inputValue, setInputValue] = React.useState("");
    const [todos, setTodos] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [count,setCount] = React.useState(0)
    React.useEffect(()=>
    {
        getTodos();
       
    },[page])

    const getTodos = () =>{
        fetch('http://localhost:3002/todos')
        .then((res)=>res.json())
        .then((res)=>setTodos(res))
        .catch((err)=> console.log("ERROR"));
    };
    const handleAdd = () => {
        console.log(inputValue)
        const payload = {
            title: inputValue,
            status: false
        }
    setCount(count+1);
    const payloadjson = JSON.stringify(payload);

    fetch('http://localhost:3002/todos',{
        method: "POST",
        body: payloadjson,
        headers: {
            "content-type": "application/json"
        }
    }).then((res)=>{
        getTodos();
    });
};
return (
    <div>
        <input
        placeholder="Add Todos"
        value={inputValue}
        onChange = {(e)=>setInputValue(e.target.value)}
        />
        <button onClick={handleAdd}>Save</button>
        {todos.map((item)=>{
            return <div>{item.title}</div>
        })}
       <button onClick={()=>setPage(page-1)} disabled={ page === 1}>PREV</button>
       <button onClick={()=>setPage(page+1)} disabled={ page === Math.ceil(count/3)}>NEXT</button>
    </div>
);
};

export { Todo };