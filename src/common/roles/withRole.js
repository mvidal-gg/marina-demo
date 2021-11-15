import { useUser } from "../hooks/useUser";

const withRole = (roles) => (Component) => (props) => {
  const { userRole } = useUser();
  if (userRole && userRole.match(roles)) {
    return <Component {...props} />;
  }
  return null;
};

export default withRole;
