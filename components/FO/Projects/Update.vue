<template>
  <form @submit.prevent novalidate>
    <h3>Projektinformationen</h3>
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
    <h3>Projekt-Zuordnung</h3>
    <section class="relation-wrapper">
      <div :class="{ pending: isPending }">
        <UIChipSelectable
          @toggle="
            trade(folder, folders, projectsToFolders, removeFolders, 'add')
          "
          v-for="(folder, index) in folders"
          :key="index"
        >
          {{ folder.name + " <" + folder.project.name + ">" }}
        </UIChipSelectable>
      </div>
      <div :class="{ pending: isPending }">
        <UIChipSelectable
          @toggle="
            trade(folder, folders, projectsToFolders, removeFolders, 'remove')
          "
          remove
          v-for="(folder, index) in projectsToFolders"
          :key="index"
        >
          {{ folder.name + " <" + folder.project.name + ">" }}
        </UIChipSelectable>
      </div>
    </section>
    <h3>Company-Zuordnung</h3>
    <section class="relation-wrapper">
      <div :class="{ pending: isPending }">
        <UIChipSelectable
          @toggle="
            trade(
              company,
              companies,
              projectsToCompanies,
              removeCompanies,
              'add'
            )
          "
          v-for="(company, index) in companies"
          :key="index"
        >
          {{ company.name }}
        </UIChipSelectable>
      </div>

      <div :class="{ pending: isPending }">
        <UIChipSelectable
          @toggle="
            trade(
              company,
              companies,
              projectsToCompanies,
              removeCompanies,
              'remove'
            )
          "
          remove
          v-for="(company, index) in projectsToCompanies"
          :key="index"
        >
          {{ company.name }}
        </UIChipSelectable>
      </div>
    </section>
    <UIButtonPrimary
      :disabled="disabled"
      icon="chevron-right"
      shrink
      @click="updateOrCreateProfile"
      text="Projekt aktualisieren"
    />
  </form>
</template>

<script setup lang="ts">
const route = useRoute();

const props = defineProps<{
  data: any;
}>();

const errorMsg = ref();
const disabled = ref(false);
const isPending = ref(false);

const projectsToFolders: Ref<any> = ref(new Set());
const folders: Ref<any> = ref(new Set());
const removeFolders: Ref<any> = ref(new Set());

const projectsToCompanies: Ref<any> = ref(new Set());
const companies: Ref<any> = ref(new Set());
const removeCompanies: Ref<any> = ref(new Set());

const managePendingState = (pending: boolean[]) => {
  isPending.value = pending.some((p) => console.log(p));
};

onMounted(async () => {
  fillPreloadedValues();

  isPending.value = true;

  const {
    data: projectToFolderResponse,
    pending: projectToFolderPending,
    error: projectToFolderError,
  }: any = await useFetch(`/api/folders/aggregateByProjectId`, {
    method: "GET",
    query: { projectId: route.params.slug },
  });

  // Add to folders
  const {
    data: folderResponse,
    pending: folderPending,
    error: folderError,
  }: any = await useFetch(`/api/folders/aggregate`, {
    method: "GET",
  });

  // Add to projectsToCompanies
  const {
    data: projectToCompanyResponse,
    pending: projectToCompanyPending,
    error: projectToCompanyError,
  }: any = await useFetch(`/api/company/aggregateByProjectId`, {
    method: "GET",
    query: { projectId: route.params.slug },
  });

  // Add to companies
  const {
    data: companyResponse,
    pending: companyPending,
    error: companyError,
  }: any = await useFetch(`/api/company/aggregate`, {
    method: "GET",
  });

  managePendingState([
    projectToFolderPending.value,
    folderPending.value,
    projectToCompanyPending.value,
    companyPending.value,
  ]);

  // We need to fill the projectsToFolders array with all folders that are already assigned to the project

  if (projectToFolderResponse.value.data.length > 0) {
    projectToFolderResponse.value.data.forEach((folder: any) => {
      folderResponse.value.data.forEach((folderArr: any) => {
        folderArr.find((f: any) => {
          if (folder.folderId === f.id) {
            projectsToFolders.value.add(f);
          }
        });
      });
    });
  }

  // every folder that isnt in projectsToFolders should be added to folders

  folderResponse.value.data.forEach((folder: any) => {
    folder.forEach((f: any) => {
      if (!projectsToFolders.value.has(f)) folders.value.add(f);
    });
  });

  // We need to fill the projectsToCompanies array with all companies that are already assigned to the project

  if (projectToCompanyResponse.value.data.length > 0) {
    projectToCompanyResponse.value.data.forEach((company: any) => {
      companyResponse.value.data.find((c: any) => {
        if (company.companyId === c.id) {
          projectsToCompanies.value.add(c);
        }
      });
    });
  }

  // every company that isnt in projectsToCompanies should be added to companies

  companyResponse.value.data.forEach((company: any) => {
    if (!projectsToCompanies.value.has(company)) companies.value.add(company);
  });
});

const trade = (
  project: any,
  arr1: any,
  arr2: any,
  removeArr: any,
  direction: "add" | "remove"
) => {
  if (direction === "add" && arr2.has(project)) {
    alert("already in array");
    return;
  }

  if (direction === "add" && !arr2.has(project)) {
    arr2.add(project);
    arr1.delete(project);
    // removeArr.add(project);
    return;
  }

  if (direction === "remove" && !arr1.has(project)) {
    arr2.delete(project);
    arr1.add(project);
    removeArr.add(project);
    return;
  }
};

const fillPreloadedValues = () => {
  if (props.data.data.length > 0) {
    const project = props.data.data[0];

    title.value.value = project.title;
    description.value.value = project.description;
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
    JSON.stringify(Array.from(projectsToFolders.value))
  );
  formData.append(
    "removeFolders",
    JSON.stringify(Array.from(removeFolders.value))
  );
  formData.append(
    "companies",
    JSON.stringify(Array.from(projectsToCompanies.value))
  );
  formData.append(
    "removeCompanies",
    JSON.stringify(Array.from(removeCompanies.value))
  );

  // error handling
  if (!validateInputs()) {
    disabled.value = false;
    return;
  }

  // request
  const { data, pending, error }: any = await useFetch("/api/projects/update", {
    method: "POST",
    body: formData,
    query: { id: route.params.slug },
  });

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
