import { useSession, useUser } from "@clerk/nextjs";

const ProtectedComponent: React.FC = () => {
  const { isLoaded, session } = useSession();
  const { user } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please log in</div>;
  }
  return <div>Welcome, {user?.firstName}</div>;
};

export default ProtectedComponent;
