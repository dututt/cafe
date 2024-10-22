import { useClerk } from "@clerk/nextjs";

const LogoutButton: React.FC = () => {
  const { signOut } = useClerk();
  return <button onClick={() => signOut({ redirectUrl: "/" })}>Logout</button>;
};

export default LogoutButton;
