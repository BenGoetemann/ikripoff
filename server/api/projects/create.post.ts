import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import {
  useBackendFormValidator,
  useFormDataValue,
} from "~~/composables/useFormHelper";

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);
  const client = serverSupabaseClient(event);

  const title = useFormDataValue("title", body);
  const description = useFormDataValue("description", body);

  const folderArray = useFormDataValue("folders", body);
  const folders = folderArray ? JSON.parse(folderArray) : [];

  const companyArray = useFormDataValue("companies", body);
  const companies = companyArray ? JSON.parse(companyArray) : [];

  const validationBody: BackendFormValidationPayload[] = [
    {
      name: "Titel",
      value: title,
      validations: ["required", "url:prevent"],
    },
    {
      name: "Beschreibung",
      value: description,
      validations: ["required", "url:prevent"],
    },
  ];

  console.log(title, description)

  const isFormValid = useBackendFormValidator(validationBody);

  if (isFormValid) {
    return {
      status: 422,
      data: null,
      error: isFormValid,
    };
  }

  const requestBody: any = {
    title,
    description,
  };

  const { data: project, error: projectError }: any = await client
    .from("project")
    .upsert({ ...requestBody })
    .select();

  console.log(project[0].id);

  for (const folder of folders) {
    const { data: folderData, error: folderError }: any = await client
      .from("projectToFolder")
      .upsert({ 
        folderId: folder.id,
        projectId: project[0].id,
       })
       .select();

    if (folderError) {
      return {
        status: 500,
        data: null,
        error: folderError,
      };
    }

  }

  for (const company of companies) {
    const { data: companyData, error: companyError }: any = await client
      .from("projectToCompany")
      .upsert({ 
        companyId: company.id,
        projectId: project[0].id,
       })
       .select();

    if (companyError) {
      return {
        status: 500,
        data: null,
        error: companyError,
      };
    }
  }

  if (projectError) {
    console.log(projectError)
    return {
      status: 500,
      data: null,
      error: projectError,
    };
  }

  return {
    status: 200,
    data: project,
    error: projectError,
  };
});
