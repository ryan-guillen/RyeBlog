const apiCall = async () => {
    const res = await fetch(`http://localhost:8080/account`, { // add
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'username': 'user 5', 'bio':'hi'}),
        next: { revalidate: 5 }
    });
    
   

    
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