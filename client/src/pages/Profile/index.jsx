import { useQuery } from "@tanstack/react-query";
import PageTemplate from "@/src/components/shared/PageTemplate";
import { getUserProfileApi, } from "@/src/api/user";
import ProfileForm from "./Components/ProfileForm";

function Profile() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfileApi,
  });

  if (isLoading) {
    return (
      <PageTemplate>
        <div>Carregando...</div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <div className="flex flex-col items-center justify-center w-full px-3 xl:px-44">
        <ProfileForm user={user} />
      </div>
    </PageTemplate>
  );
}

export default Profile;
