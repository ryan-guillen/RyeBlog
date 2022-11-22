const apiCall = async () => {
    
    const res = await fetch(`http://localhost:8080/product/637d15cd0fb56203d652363d`, { // add
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify({'name': 'Product 2', 'description': 'Product 2 description'})
    });
    
   /*
    const res = await fetch(`http://localhost:8080/employees/4`, { // replace / update
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': 'Samwise Gamgee', 'role': 'gardener'})
    });
    */
   /*
    const res = await fetch(`http://localhost:8080/employees/4`, { // replace / update
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    */
    const data = await res.json();
    console.log(data);
    return data;
}


const Posts = async () => {
    const r = await apiCall();

    return (
        <div>
            In Posts
            <button>call API</button>
        </div>
    )
}

export default Posts;