import { useState } from "react";
import "../styles/ChatWindow.css";
function ChatWindow({ user, setUserChat,setUsers }) {
  let users = JSON.parse(localStorage.getItem("users"));
  const [text, setText] = useState("");
  const [notification, setNotification] = useState("");
  const date = new Date();
  function handleSubmit(e) {
    e.preventDefault();
    if(users[0].id!==user.id){
      users=users.filter((u)=>u.id!==user.id)
      users.unshift(user);
      setUsers(users)
      localStorage.setItem("users", JSON.stringify(users));
  }
    text.length > 0 &&
      users[0].chat.push({
        user: { name: "default", id: "0000" },
        text: text,
        date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
        time:
          date.getHours() +
          ":" +
          (date.getMinutes() < 10
            ? "0" + date.getMinutes()
            : date.getMinutes()),
      });
    localStorage.setItem("users", JSON.stringify(users));
    setUserChat(users[0]);
    setTimeout(() => {
      fetch("https://api.chucknorris.io/jokes/random")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          users[0].chat.push({
            user: { name: user.name, id: user.id },
            text: data.value,
            date:
              date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
            time:
              date.getHours() +
              ":" +
              (date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes()),
          });
          localStorage.setItem("users", JSON.stringify(users));
          setUserChat(JSON.parse(localStorage.getItem("users"))[0]);
          setTimeout(
            () =>
              document
                .getElementById("chatContent")
                .scrollTo(
                  0,
                  document.getElementById("chatContent").scrollHeight
                ),
            100
          );
            setNotification(true);
            setTimeout(()=>setNotification(false),3000);
        });
    }, 5000);
    setTimeout(
      () =>
        document
          .getElementById("chatContent")
          .scrollTo(0, document.getElementById("chatContent").scrollHeight),
      100
    );
    setText("")
  }
  return (
    <section className="chat">
      <div className="chat--header">
        <img className="main__image" src={user.imageURL} />
        <h2>{user.name}</h2>
      </div>
      <div className="chat--content" id="chatContent">
        {user.chat.map((message) => (
          <>
            {user.id === message.user.id ? (
              <div className="chat--content__message">
                <img className="main__image" src={user.imageURL} />
                <p className="chat--content__message--holder">
                  <span className="chat--content__message--holder__text">
                    {message.text}
                  </span>
                  <span className="chat--content__message--holder__date">
                    {message.date + " " + message.time}
                  </span>
                </p>
              </div>
            ) : (
              <div className="chat--content__message chat--content__message__default">
                <p className="chat--content__message--holder chat--content__message--holder__default">
                  <span className="chat--content__message--holder__text">
                    {message.text}
                  </span>
                  <span className="chat--content__message--holder__date">
                    {message.date + " " + message.time}
                  </span>
                </p>
              </div>
            )}
          </>
        ))}
      </div>
      <div className="chat--footer">
        <form onSubmit={handleSubmit}>
          <input
            className="chat--footer__input"
            type="text"
            placeholder="Type your message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input className="chat--footer__submit" type="submit" value="" />
        </form>
      </div>
      {notification && (
        <div className="notification">
          You got 1 new message from{" "}
          {JSON.parse(localStorage.getItem("users"))[0].name}
        </div>
      )}
    </section>
  );
}
export default ChatWindow;