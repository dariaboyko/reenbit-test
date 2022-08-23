import "../styles/Sidebar.css";
function ChatList({ setUserChat, search, users }) {
  return (
    <div className="sidebar--content">
      <h2 className="sidebar--content__title">Chats</h2>
      <ul className="sidebar--content__list">
        {search.length === 0
          ? users.map((u) => (
              <li
                key={"chat" + u.id}
                onClick={() =>
                  setUserChat(
                    JSON.parse(localStorage.getItem("users")).filter(
                      (user) => user.id === u.id
                    )[0]
                  )
                }
              >
                <img src={u.imageURL} className="main__image" />
                <div>
                  <div className="sidebar--content__list__info">
                    <span className="name">{u.name}</span>
                    <span className="message">
                      {u.chat[u.chat.length - 1].date}
                    </span>
                  </div>
                  <div className="message">
                    {u.chat[u.chat.length - 1].text}
                  </div>
                </div>
              </li>
            ))
          : users.map(
              (u) =>
                u.name.toLowerCase().includes(search.toLowerCase()) && (
                  <li
                    key={"chat" + u.id}
                    onClick={() =>
                      setUserChat(
                        JSON.parse(localStorage.getItem("users")).filter(
                          (user) => user.id === u.id
                        )[0]
                      )
                    }
                  >
                    <img src={u.imageURL} className="main__image" />
                    <div>
                      <div className="sidebar--content__list__info">
                        <span className="name">{u.name}</span>
                        <span className="message">
                          {u.chat[u.chat.length - 1].date}
                        </span>
                      </div>
                      <div className="message">
                        {u.chat[u.chat.length - 1].text}
                      </div>
                    </div>
                  </li>
                )
            )}
      </ul>
    </div>
  );
}

export default ChatList;
