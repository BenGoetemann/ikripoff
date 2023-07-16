<template>
  <form @submit.prevent novalidate>
    <h3>Person</h3>
    <UIInputText
      type="text"
      name="Titel"
      required
      :value="title.value"
      @update="(e) => (title.value = e)"
      :loading="isPending"
      :disabled="disabled"
      :error-message="title.errorMsg"
    />
    <UIInputArea
      name="Beschreibung"
      required
      :value="description.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (description.value = e)"
      :error-message="description.errorMsg"
    />
    <section class="relation-wrapper">
      <div>
        <UIChipSelectable
          @toggle="trade(folder, folders, foldersToCompany)"
          v-for="(folder, index) in folders"
          :key="index"
        >
          {{ folder.name + " <" + folder.project.name + ">" }}
        </UIChipSelectable>
      </div>

      <div>
        <UIChipSelectable
          @toggle="trade(folder, folders, foldersToCompany)"
          remove
          v-for="(folder, index) in foldersToCompany"
          :key="index"
        >
          {{ folder.name + " <" + folder.project.name + ">" }}
        </UIChipSelectable>
      </div>
    </section>
    <section class="relation-wrapper">
      <div>
        <UIChipSelectable
          @toggle="trade(company, companies, projectsToCompany)"
          v-for="(company, index) in companies"
          :key="index"
        >
          {{ company.name }}
        </UIChipSelectable>
      </div>

      <div>
        <UIChipSelectable
          @toggle="trade(company, companies, projectsToCompany)"
          remove
          v-for="(company, index) in projectsToCompany"
          :key="index"
        >
          {{ company.name }}
        </UIChipSelectable>
      </div>
    </section>
    <UIButtonPrimary
      :disabled="disabled"
      icon="user-plus"
      shrink
      @click="updateOrCreateProfile"
      text="Projekt erstellen"
    />
  </form>
</template>

<script setup lang="ts">
const user = useSupabaseUser();

// Feedback

const errorMsg = ref();
const disabled = ref(false);
const isPending = ref(false);

const foldersToCompany: Ref<any> = ref(new Set());
const folders: Ref<any> = ref(new Set());
const companies: Ref<any> = ref(new Set());
const projectsToCompany: Ref<any> = ref(new Set());

const {
  data: folderResponse,
  pending: folderPending,
  error: folderError,
}: any = await useFetch(`/api/folders/aggregate`, {
  method: "GET",
});

const {
  data: companyResponse,
  pending: companyPending,
  error: companyError,
}: any = await useFetch(`/api/company/aggregate`, {
  method: "GET",
});

onMounted(() => {
  if (folderResponse.value.data) {
    folderResponse.value.data.forEach((folderArr: any) => {
      folderArr.forEach((folder: any) => {
        folders.value.add(folder);
      });
    });
  }
  if (companyResponse.value.data) {
    companyResponse.value.data.forEach((company: any) => {
      companies.value.add(company);
    });
  }
});

const trade = (project: any, arr1: any, arr2: any) => {
  if (arr2.has(project)) {
    arr2.delete(project);
    arr1.add(project);
  } else {
    arr2.add(project);
    arr1.delete(project);
  }
};

// Inputs

const title: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const description: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const updateOrCreateProfile = async () => {
  resetErrorMessages();
  disabled.value = true;

  let formData = new FormData();

  formData.append("title", title.value.value);
  formData.append("description", description.value.value);
  formData.append(
    "folders",
    JSON.stringify(Array.from(foldersToCompany.value))
  );
  formData.append(
    "companies",
    JSON.stringify(Array.from(projectsToCompany.value))
  );

  // error handling
  if (!validateInputs()) {
    disabled.value = false;
    return;
  }

  // request
  const { data, pending, error }: any = await useFetch(
    "../api/projects/create",
    {
      method: "POST",
      body: formData,
    }
  );

  let ok = data.value.status === 200;

  useFormToast(
    !ok,
    "Ihr Profil wurde erfolgreich erstellt.",
    "Ihr Profil konnte nicht erstellt werden. "
  );

  disabled.value = false;
  if (ok) return navigateTo("/projekte");
};

const validateInputs = () => {
  const errorMessages = ref([] as string[]);

  if (!title.value.value) {
    const errorMessage = "Bitte gib einen Titel an.";
    title.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (useUrlSpotter(title.value.value)) {
    const errorMessage = "Bitte gib einen gültigen Titel an.";
    title.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (!description.value.value) {
    const errorMessage = "Bitte gib eine Beschreibung an.";
    description.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (useUrlSpotter(description.value.value)) {
    const errorMessage = "Bitte gib einen gültigen Titel an.";
    description.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (errorMessages.value.length !== 0) {
    errorMsg.value = errorMessages.value.join(" ");
    return false;
  }
  return true;
};

const resetErrorMessages = () => {
  errorMsg.value = "";
  title.value.errorMsg = "";
  description.value.errorMsg = "";
};
</script>

<style lang="css" scoped></style>
