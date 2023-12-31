export const signUpUser = async (credentials: any) => {
  const client = useSupabaseAuthClient();
  const { error } = await client.auth.signUp(credentials);
  return {
    error: error,
  };
};

export const signInUser = async (credentials: any) => {
  const client = useSupabaseAuthClient();
  const { error } = await client.auth.signInWithPassword(credentials);
  await navigateTo("/");
  const navStore = useNavStore();
  navStore.setCurrentPage("");
  return {
    error: error,
  };
};

export const signOutUser = async () => {
  const client = useSupabaseAuthClient();
  const userStore = useUserStore();
  const router = useRouter();
  userStore.flushUserStore();
  const { error } = await client.auth.signOut();
  if (!error) {
    const navStore = useNavStore();
    navStore.setCurrentPage("");
    router.push("/login");
  } else {
    return alert("Something went wrong !");
  }
};
