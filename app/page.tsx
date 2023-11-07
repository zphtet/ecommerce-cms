import { UserButton } from "@clerk/nextjs";
import CreateDialog from "./ui/create-dialog";
export default async function Page() {
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <CreateDialog />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
