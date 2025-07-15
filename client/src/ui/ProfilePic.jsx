import PropTypes from "prop-types";

ProfilePic.propTypes = {
  type: PropTypes.string,
  user: PropTypes.object,
};

function ProfilePic({ type, user }) {
  const className = "rounded-full";

  const style = {
    primary: className + " w-16 h-16",
    small: className + " w-12 h-12",
  };

  return (
    <>
      <div>
        <img className={style[type]} src={user.avatar} alt="UserProfilePic" />
      </div>
    </>
  );
}

export default ProfilePic;
