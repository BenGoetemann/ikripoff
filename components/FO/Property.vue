<template>
  <div class="property-form-wrapper">
    <div class="form-section">
      <form @submit.prevent novalidate>
        <h3>Basisangaben</h3>
        <UIInputDropdown
          name="Immobilientyp"
          :value="listingType.value"
          @update="(e) => (listingType.value = e)"
          :error-message="listingType.errorMsg"
          :loading="isPending"
          :disabled="disabled"
          required
          :options="useOptionValue('listingType')"
        />
        <section v-if="listingType.value === 'houseBuy'">
          <h3>Informationen zum Haus</h3>
          <UIInputDropdown
            name="Immobilientyp"
            :value="propertyType.value"
            @update="(e) => (propertyType.value = e)"
            :error-message="propertyType.errorMsg"
            :loading="isPending"
            :disabled="disabled"
            required
            :options="useOptionValue(listingType.value)"
          />
        </section>
        <section v-if="listingType.value === 'apartmentBuy'">
          <h3>Informationen zur Wohnung</h3>
          <UIInputDropdown
            name="Immobilientyp"
            :value="propertyType.value"
            @update="(e) => (propertyType.value = e)"
            :error-message="propertyType.errorMsg"
            :loading="isPending"
            :disabled="disabled"
            required
            :options="useOptionValue(listingType.value)"
          />
        </section>
        <section v-if="listingType.value === 'plotBuy'">
          <h3>Informationen zum Grundstück</h3>
          <UIInputDropdown
            name="Immobilientyp"
            :value="propertyType.value"
            @update="(e) => (propertyType.value = e)"
            :error-message="propertyType.errorMsg"
            :loading="isPending"
            :disabled="disabled"
            required
            :options="useOptionValue(listingType.value)"
          />
        </section>
        <section v-if="listingType.value === 'officeBuy'">
          <h3>Informationen zu den Büroflächen</h3>
          <UIInputDropdown
            name="Immobilientyp"
            :value="propertyType.value"
            @update="(e) => (propertyType.value = e)"
            :error-message="propertyType.errorMsg"
            :loading="isPending"
            :disabled="disabled"
            required
            :options="useOptionValue(listingType.value)"
          />
        </section>
        <section v-if="listingType.value === 'gastronomyBuy'">
          <h3>Informationen zum Gastronomie-Objekt</h3>
          <UIInputDropdown
            name="Immobilientyp"
            :value="propertyType.value"
            @update="(e) => (propertyType.value = e)"
            :error-message="propertyType.errorMsg"
            :loading="isPending"
            :disabled="disabled"
            required
            :options="useOptionValue(listingType.value)"
          />
        </section>
        <section v-if="listingType.value === 'retailBuy'">
          <h3>Informationen zum Einzelhandelsobjekt</h3>
          <UIInputDropdown
            name="Immobilientyp"
            :value="propertyType.value"
            @update="(e) => (propertyType.value = e)"
            :error-message="propertyType.errorMsg"
            :loading="isPending"
            :disabled="disabled"
            required
            :options="useOptionValue(listingType.value)"
          />
        </section>
        <section v-if="listingType.value === 'industrialBuy'">
          <h3>Informationen zum Industrieobjekt</h3>
          <UIInputDropdown
            name="Immobilientyp"
            :value="propertyType.value"
            @update="(e) => (propertyType.value = e)"
            :error-message="propertyType.errorMsg"
            :loading="isPending"
            :disabled="disabled"
            required
            :options="useOptionValue(listingType.value)"
          />
        </section>
        <section v-if="listingType.value === 'parkingSpaceBuy'">
          <h3>Informationen zum Stellplatz</h3>
          <UIInputDropdown
            name="Immobilientyp"
            :value="propertyType.value"
            @update="(e) => (propertyType.value = e)"
            :error-message="propertyType.errorMsg"
            :loading="isPending"
            :disabled="disabled"
            required
            :options="useOptionValue(listingType.value)"
          />
        </section>
        <section v-if="listingType.value === 'commercialPlotBuy'">
          <h3>Informationen zum Grundstück</h3>
          <UIInputDropdown
            name="Immobilientyp"
            :value="propertyType.value"
            @update="(e) => (propertyType.value = e)"
            :error-message="propertyType.errorMsg"
            :loading="isPending"
            :disabled="disabled"
            required
            :options="useOptionValue(listingType.value)"
          />
        </section>
        <section v-if="listingType.value === 'otherCommercialBuy'">
          <h3>Informationen zum Wohnanlage</h3>
        </section>
        <section v-if="listingType.value === 'residentialInvestmentBuy'">
          <h3>Informationen zum Wohnanlage</h3>
        </section>
        <section v-if="listingType.value === 'commercialInvestmentBuy'">
          <h3>Informationen zur Gewerbeanlage</h3>
          <UIInputDropdown
            name="Immobilientyp"
            :value="propertyType.value"
            @update="(e) => (propertyType.value = e)"
            :error-message="propertyType.errorMsg"
            :loading="isPending"
            :disabled="disabled"
            required
            :options="useOptionValue(listingType.value)"
          />
        </section>
        <section>
          <h3>Preis</h3>
          <UIInputNumber
            name="Kaufpreis"
            required
            :value="purchasePrice.value"
            :loading="isPending"
            :disabled="disabled"
            @update="(e: number) => (purchasePrice.value = e)"
            :error-message="purchasePrice.errorMsg"
          />
        </section>
        <section>
          <h3>Anzeige</h3>
          <UIInputText
            name="Anzeigentitel"
            type="text"
            required
            :value="title.value"
            :loading="isPending"
            :disabled="disabled"
            @update="(e: number) => (title.value = e)"
            :error-message="title.errorMsg"
          />
        </section>
        <!-- title -->
        <section>
          <h3>Titelbild</h3>
          <UIInputImage
            :value="image.preloadedValue"
            @update="(e) => (image.value = e)"
            :error-message="image.errorMsg"
            :loading="isPending"
            name="profile picture"
          />
        </section>
        <UIButtonPrimary
          :disabled="disabled"
          icon="camera"
          shrink
          @click="update"
          text="Profilbild aktualisieren"
        />

        <UIButtonPrimary
          :disabled="disabled"
          icon="camera"
          shrink
          @click="test"
          text="Test Submit"
        />
        <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p>
      </form>
    </div>
    <div class="preview-section">
      <h3>Vorschau</h3>
      <div class="preview">
        <div class="preview-image">
          <img :src="image.value" />
        </div>
        <div class="preview-text">
          <p>{{ listingType.value }}</p>
          <p>{{ propertyType.value }}</p>
          <p>{{ purchasePrice.value }}</p>
          <p>{{ title.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOptionValue } from "~/composables/useFormHelper";

const route = useRoute();
const errorMsg = ref();
const disabled = ref(false);
const isPending = ref(false);

const image = ref({
  value: "",
  preloadedValue: "",
  errorMsg: "",
});

const listingType: Ref<InputRef<ListingType | "">> = ref({
  value: "",
  errorMsg: "",
});

const propertyType: Ref<InputRef<ApartmentType | HouseType | "">> = ref({
  value: "",
  errorMsg: "",
});

const purchasePrice: Ref<InputRef<number | undefined>> = ref({
  value: undefined,
  errorMsg: "",
});

const title: Ref<InputRef<string | undefined>> = ref({
  value: undefined,
  errorMsg: "",
});

const update = async () => {
  resetErrorMessages();
  disabled.value = true;

  let formData = new FormData();

  formData.append("profilePicture", image.value.value);

  // error handling
  if (!validateInputs()) {
    disabled.value = false;
    return;
  }

  // request
  const { data, pending, error } = await useFetch("api/contact/thumbnail", {
    method: "POST",
    body: formData,
  });

  isPending.value = pending.value;

  useFormToast(
    data.value.error,
    "Ihr Profilbild wurde aktualisiert",
    "Ihr Profilbild konnte nicht aktualisiert werden. Grund: "
  );

  disabled.value = false;
};

const validateInputs = () => {
  const errorMessages = ref([] as string[]);

  if (!image.value.value) {
    const errorMessage =
      "Sie müssen ein neues Profilbild wählen um es zu aktualisieren.";
    image.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (errorMessages.value.length !== 0) {
    errorMsg.value = errorMessages.value.join(" ");
    return false;
  }
  return true;
};

const resetErrorMessages = () => {
  image.value.errorMsg = "";
  errorMsg.value = "";
};

// const props = defineProps<{
//   data: any;
// }>();

onMounted(() => {
  //fillPreloadedValues();
});

// const fillPreloadedValues = () => {
//   if (props.data.data.length > 0) {
//     const contact = props.data.data[0];
//     const lastUpdatedAt = props.data.data[0].lastThumbnailUpdate;
//     image.value.value = contact.thumbnail + `?${useDateNow()}`;
//   }
// };

const test = () => {
  console.log({
    listingType: listingType.value.value,
    propertyType: propertyType.value.value,
    title: title.value.value,
    purchasePrice: purchasePrice.value.value,
  });
};

const resetPropertyType = () => {
  propertyType.value.value = undefined;
  console.log("2 - reset propertyType", {
    listingType: listingType.value.value,
    propertyType: propertyType.value.value,
  });
};

watch(
  () => listingType.value.value,
  (newValue) => {
    console.log("1 - changed listingType");
    resetPropertyType();
  }
);
</script>

<style lang="css" scoped>
.property-form-wrapper {
  @apply grid grid-cols-2 gap-4;

  > div {
    @apply border border-red-500;
  }
}
</style>
