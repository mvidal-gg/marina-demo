import { useSelector } from "react-redux";

const withRole = (roles) => (Component) => (props) => {
  const { user } = useSelector((state) => state.auth);
  const { role: userRole } = user;
  if (userRole && userRole.match(roles)) {
    return <Component {...props} />;
  }
  return null;
};

export default withRole;
