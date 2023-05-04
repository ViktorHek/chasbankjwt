import { useState } from "react";
import axios from "axios";

function App() {
  const [money, setMoney] = useState(0);
  const [openLogin, setOpenLogin] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let payload = {
      userName: event.target["userName"].value,
      password: event.target["password"].value,
      amount: event.target["amount"].value,
    };
    let result = await axios.post("http://localhost:3001/users", payload);
    if(result.status === 200) alert(result.data)
  };

  const handleLoggin = async (event) => {
    event.preventDefault();
    let payload = {
      userName: event.target["userName"].value,
      password: event.target["password"].value,
    };
    let result = await axios.post("http://localhost:3001/sessions", payload);
    console.log('result: ',result)
    if (result.data) {
      let result2 = await axios.get("http://localhost:3001/me/accounts/" + result.data);
      setMoney(result2.data.money);
    } else {
      alert('invalid username or passeord');
    }
  };

  function handleLoginButton() {
    setOpenLogin(!openLogin)
  }

  return (
    <>
      <h1>create a user and give me your money</h1>
      <button onClick={handleLoginButton}>login</button>
      {openLogin && (
        <div>
          <h3>log in</h3>
          <form onSubmit={handleLoggin}>
            <label for="userName">User Name</label>
            <input type="text" id="userName" name="userName" />
            <label for="password">password</label>
            <input type="password" id="password" name="password" />
            <input type="submit" value="submit" />
          </form>
        </div>
      )}
      {money === 0 ? (
        <div>
          <h3>create user</h3>
          <form onSubmit={handleSubmit}>
            <label for="userName">User Name</label>
            <input type="text" id="userName" name="userName" />
            <label for="password">password</label>
            <input type="password" id="password" name="password" />
            <label for="amount">Amount of money</label>
            <input type="text" id="amount" name="amount" />
            <input type="submit" value="submit" />
          </form>
        </div>
      ) : (
        <div>
          <span>money is {money}</span>
        </div>
      )}
    </>
  );
}

export default App;
