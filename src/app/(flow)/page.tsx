import { FormComponent } from "@/form/FormComponent";

// TODO redirect to /questions/personal if the user is not logged in
export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <FormComponent />
    </div>
  );
}
