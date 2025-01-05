import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Moment from 'moment'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],
      showAddUser: false,
      genderValue: 0,
    }
  }
  
  API_URL = "http://localhost:5066/";

  componentDidMount() {
    this.refreshUsers();
  }

  async refreshUsers() {
    fetch(this.API_URL+"api/Users").then(response=> response.json())
    .then(data => {
        this.setState({users:data});
    })
  }

  async addClick() {
      var userName = document.getElementById("name").value;
      var userEmail = document.getElementById("email").value;
      var userGender = this.state.genderValue;
      var userAge = document.getElementById("age").value;
      var userBirthdate = document.getElementById("birthdate").value;

      fetch(this.API_URL+"api/Users", {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          Name: userName,
          Email: userEmail,
          Gender: userGender,
          Age: userAge,
          BirthDate: userBirthdate
        })
      }).then(res=>res.json())
      .then((result) => {
        alert("Successfully Inserted!");
        this.refreshUsers();
      })
  }

  async editClick(Id) {
    var userName = document.getElementById("userName").value;
    var userEmail = document.getElementById("userEmail").value;
    var userGender = document.getElementById("userGender").value;
    
    var userAge = document.getElementById("userAge").value;
    var userBirthdate = document.getElementById("userBirthDate").value;

    fetch(this.API_URL+"api/Users", {
      method: "PUT",
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        Name: userName,
        Email: userEmail,
        Gender: userGender,
        Age: userAge,
        BirthDate: userBirthdate
      })
    }).then(res=>res.json())
    .then((result) => {
      alert("Successfully Updated!");
      this.refreshUsers();
    })
}

  async deleteClick(Id) {

    fetch(this.API_URL+"api/Users?Id="+Id, {
      method: "DELETE",
      headers : {      
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res=>res.json())
    .then((result) => {
      alert("Successfully Deleted!");
      this.refreshUsers();
    })
  }

  

  
  render() {
    Moment.locale('em');
    const {users} = this.state;
    
    return (
        <div className="App">
          <h2>Users Table</h2>
          
          <div className="row justify-content-center">
              <table>
                <thead></thead>
                <tbody>
                    <tr>
                      <td>Name:</td>
                      <td><input type='text' name='name' id='name'/></td>
                      <td>Email:</td>
                      <td><input type='text' name='email' id='email'/></td>
                      <td>Gender:</td>
                      <td><input type='radio' name='gender' id='gender' onChange={this.onChangeState} value={1} />Male &nbsp; 
                          <input type='radio' name='gender' id='gender' onChange={this.onChangeState} value={2} />Female
                      </td>
                      <td></td>
                      <td></td>
                      <td>Age:</td>
                      <td><input type='number' name='age' id='age' /></td>
                      <td>BirthDate:</td>
                      <td><input type='date' name='birthdate' id='birthdate' /></td>
                      <td><button onClick={()=> this.addClick()}>Add User</button></td>
                    </tr>
                </tbody>
              </table>
          </div>

          <br></br><br></br>

          <div className="row justify-content-center">
            <table className="table table-dark table-bordered">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Age</th>
                <th scope="col">BirthDate</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
                {users.map(user => 
                <tr>
                  <td><input type = "text" className="openfield" id= "userId" value={user.Id} disabled="true"/></td>
                  <td><input type = "text" className="openfield" id= "userName" value={user.Name} disabled="true"/></td>
                  <td><input type = "text" className="openfield" id= "userEmail" value={user.Email} disabled="true"/></td>
                  <td>{ user.Gender = 1 ? "Male" : "Female" }</td>
                  <td><input type = "text" className="openfield" id= "userAge" value={user.Age} disabled="true"/></td>
                  <td>{Moment(user.BirthDate).format('MMM d, yyyy')}</td>
                  <td><button onClick={()=> this.editClick(user.Id)}>Edit User</button>&nbsp;&nbsp;
                    <button onClick={()=> this.deleteClick(user.Id)}>Delete User</button>
                  </td>
                </tr>
                )}
            </tbody>
            </table>
          </div>
            

        </div>
    );
  }
  
}

function onChangeState(e){
  this.setState({
    genderValue: e.currentTarget.value
  })
}

export default App;
