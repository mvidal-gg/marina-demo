import { useSelector } from "react-redux";

const withRole = (roles) => (Component) => (props) => {
  const { userRole } = useSelector((state) => state.auth);
  if (userRole && userRole.match(roles)) {
    return <Component {...props} />;
  }
  return null;
};

export default withRole;
