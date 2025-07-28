import { useSelector } from "react-redux";
import Message from "./Message";
import { useEffect, useRef } from "react";

function Messages() {
  const { user } = useSelector((state) => state.user);
  const messages = useSelector((state) => state.currentChat.messages);
  const bottomRef = useRef(null);
  console.log(messages);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  return (
    <div className="mt-4 pb-4 px-8 flex flex-col gap-1 flex-1 bg-amber-300 overflow-auto">
      {messages &&
        messages.map((message) => (
          <Message
            key={message._id}
            sender={message.sender === user._id ? "me" : "you"}
            message={message}
            time={message.createdAt.slice(11, 16)}
          >
            {message.message}
          </Message>
        ))}
      <span ref={bottomRef} />
    </div>
  );

  // return (
  //   <div className="py-4 px-8 flex flex-col gap-4 flex-1 bg-amber-300 overflow-auto">
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"you"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //     <Message sender={"me"}>
  //       Ok so what if i get very long message that does not mean anything to me
  //       at all but i got it any way does my componet work or will it break under
  //       the pressure of the length of this message.
  //     </Message>
  //   </div>
  // );
}

export default Messages;
