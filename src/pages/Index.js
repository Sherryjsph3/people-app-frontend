import { useState } from "react";
import { Link } from "react-router-dom";

function Index(props) {
    //state to hold form data
    const [newForm, setNewForm] = useState({
        name: "",
        image: "",
        title: "",
    });

    //handleChange function for form to allow our state to control the form
    const handleChange = (event) => {
        //spreadout the current values of our form
        setNewForm({...newForm, [event.target.name]: event.target.value });
    }

    //handleSubmit to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        props.createPeople(newForm);
        setNewForm({
        name: "",
        image: "",
        title: "",
        })
    }

    const loaded = () => {
        return props.people.map((person) => (
            <div key={person._id} className="person">
                <Link to={`people/${person._id}`}>
                    <h1>{person.name}</h1>
                </Link>
                {person.image && <img src={person.image} alt={person.name}/>}
                <h3>{person.title}</h3>
            </div>
        ))
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }
       
        return (
            //controlled components need onchange and value
            <section>
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    value={newForm.name}
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                    />
                     <input
                    type="text"
                    value={newForm.image}
                    name="image"
                    placeholder="imageURL"
                    onChange={handleChange}
                    />
                     <input
                    type="text"
                    value={newForm.title}
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                    />
                    <input type="submit" value="Create Person"/>
                </form>
             
                {props.people ? loaded() : loading()}  
            </section>
            
        )
        

  } 
  
  export default Index;