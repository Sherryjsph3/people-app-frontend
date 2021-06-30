import {useEffect, useState} from 'react';


function Show({match, history, people, updatePeople, deletePeople}) {
  const [editForm, setEditForm] = useState({
      name:"",
      title:"",
      image: ""
  })
  
  const [person, setPerson] = useState(null)


  useEffect(() => {
      if(people) {
    const id = match.params.id
      //.find the first match in an arry that runs true
    const foundPerson = people.find(p => p._id === id);
    setPerson(foundPerson)
    setEditForm(foundPerson)
      }
  }, [people,match])

  const loading = () => {
      return <h1>Loading...</h1>
  }

  const loaded = () => {
    return(
        <div className="person">
            <h1>{person.name}</h1>
            <h2>{person.title}</h2>
            <img src={person.image} alt={person.name} />
            <button onClick={() => handleDelete(person._id)}>Delete Person</button>
        </div>
    )
  } 
  //cant do onClick(handleDelete(person._id)) because it would delete as soon as you render to show page

const handleChange = (event) => {
    setEditForm({...editForm, [event.target.name]: event.target.value})
}

const handleSubmit = (event) => {
    event.preventDefault();
    const {_id, name, title, image} = editForm;
    updatePeople({name, title, image}, _id);
}

const handleDelete = (id) => {
    deletePeople(id);
    //push history into our browser history -- will redirect us back to the home page
    history.push("/");
}

  return (
      <div>
          {person ? loaded() : loading()}
          <form onSubmit={handleSubmit}> 
              <input type="text" name="name" value={editForm.name} onChange={handleChange} />
              <input type="text" name="title" value={editForm.title} onChange={handleChange} />
              <input type="text" name="image" value={editForm.image} onChange={handleChange} />
              <input type="submit"  value="Edit Person"/>
          </form>
      </div>
  )
}
  export default Show;