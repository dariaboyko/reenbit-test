import "../styles/Sidebar.css";
import SidebarHeader from "./SidebarHeader";
import { useState } from "react";
import ChatList from "./ChatList";
function Sidebar({ setUserChat,users }) {
  const [search, setSearch] = useState("");
  return (
    <section className="sidebar">
      <SidebarHeader setSearch={setSearch} />
      <ChatList setUserChat={setUserChat} search={search} users={users}/>
    </section>
  );
}

export default Sidebar;
