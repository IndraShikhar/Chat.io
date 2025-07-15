import PropTypes from "prop-types";

function Message({ children, sender, time }) {
  const basic = "rounded-md p-2 w-fit max-w-3/4 xl:max-w-3/5 flex flex-col";
  const style = `${basic} ${
    sender === "me" ? "bg-amber-200 ml-auto" : "bg-gray-200"
  } `;

  return (
    <div className={style}>
      <p className=" wrap-break-word">{children}</p>
      <span className="text-right text-xs font-bold text-stone-500">
        {time}
      </span>
    </div>
  );
}

Message.propTypes = {
  children: PropTypes.string,
  sender: PropTypes.string,
  time: PropTypes.string,
};

export default Message;
