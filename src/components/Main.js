import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

//index as a child --root route
//supports url parameters when we need to expose add info from our route parameter we use render props or rp ....implicitly return show page -- spread out method all the props
function Main(props) {

    // state to hold our list of people
    //people is the variable and setPeople is what its holding
    //null is a good representation of noting, we start with nothing
    const [ people, setPeople] = useState(null);

    //function to make the api call for people
    const URL = "http://localhost:4000/people/";

    //fetch people data from the backend
    const getPeople = async () => {
        const response = await fetch(URL);
        //once we get the response its raw so we have to json to serialize the data 
        const data = await response.json();
        setPeople(data);//the list of people
    }

    //function to create a new person using fetch

    const createPeople = async (person) => {
        //make a post req to create people
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json", //content type we have to tell server we are sending json data
            },
            body: JSON.stringify(person),//turns formatable js and turns it into json
        });
        //update list of people after data is updated 
        getPeople()
    }

    const updatePeople = async (person, id) => {
        //make put requests to create people
        await fetch(URL + id, {
            //configuration object

            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(person),
        })
        //update list of people
        getPeople()
    }

    const deletePeople = async id => {

        //make delete request to people api
        await fetch(URL + id, {
            method: "DELETE",
        })
        //update list of people
        getPeople()
    }

    // useEffect to make an initial call for people list-- runs a side effect as a rsult of the component getting mounted to the DOM -- it also needs 
    useEffect(() => getPeople(), []);

//pass the people state and the create function to Index
    return (
        <main>
        <Switch>
          <Route exact path="/">
            <Index people={people} createPeople={createPeople}/>
          </Route>
          <Route
            path="/people/:id"
            render={(rp) => (
                //rp comes from react router dom
                //other functionality to check if user logged in
                //if not, programtically redirect somewhre else
              <Show
                people={people}
                updatePeople={updatePeople}
                deletePeople={deletePeople}
                {...rp}
                
              />
            )}
          />
        </Switch>
      </main>
    );
  }
  
  
  export default Main;