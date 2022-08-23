import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import {useState,useEffect} from "react"
import { USERS } from "./components/Users";
function App() {
  !localStorage.getItem("users") &&
    localStorage.setItem("users", JSON.stringify(USERS));
  const [userChat, setUserChat] = useState(
    JSON.parse(localStorage.getItem("users"))[0]
  );
   const [users, setUsers] = useState(
     JSON.parse(localStorage.getItem("users"))
   );
  return (
    <div className="page">
      <Sidebar setUserChat={setUserChat} users={users}/>
      <ChatWindow user={userChat} setUserChat={setUserChat} setUsers={setUsers}/>
    </div>
  );
}

export default App;
