import { UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
