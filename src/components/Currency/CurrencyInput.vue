<template>
  <div class="q-input q-input-outlined">
    <label class="q-field__label">{{ label }}</label>
    <div class="q-field__container">
      <input
        ref="inputRef"
        type="text"
        class="q-field__input"
        :class="{ 'q-field__error': showError }"
        @input="validateRequired"
        @focus="showError = false"
        @blur="validateRequiredAndHideError"
      />
    </div>
    <div v-if="showError" class="q-field__bottom row">
      <q-icon
        v-if="showError"
        name="warning"
        class="q-field__right-icon q-icon--dark"
      />
      <span class="q-field__message">{{ errorMessage }}</span>
    </div>
  </div>
</template>


<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { useCurrencyInput } from "vue-currency-input";

export default defineComponent({
  name: "CurrencyInput",
  props: {
    modelValue: {
      type: Number,
      default: null,
    },
    minValue: Number,
    label: String,
    options: {
      type: Object,
      default: () => ({
        locale: "pt-BR",
        currency: "BRL",
        valueAsInteger: false,
        distractionFree: false,
        autoDecimalMode: true,
        allowNegative: false,
        precision: 2,
      }),
    },
    required: Boolean,
  },
  setup(props) {
    const { inputRef, formattedValue, setValue } = useCurrencyInput(
      props.options
    );
    const showError = ref(false);
    const errorMessage = ref("");

    const validateRequired = () => {
      if (
        (props.required && !props.modelValue) ||
        props.modelValue <= props.minValue
      ) {
        showError.value = true;
        errorMessage.value = "Este campo é obrigatório.";
      } else {
        showError.value = false;
        errorMessage.value = "";
      }
    };
    const validateRequiredAndHideError = () => {
      validateRequired();
      if (!showError.value) {
        showError.value = false;
      }
    };

    watch(
      () => props.modelValue,
      () => {
        if (props.modelValue) {
          setValue(props.modelValue);
        }
      }
    );

    return {
      inputRef,
      formattedValue,
      showError,
      errorMessage,
      validateRequired,
      validateRequiredAndHideError,
    };
  },
});
</script>

<style scoped>
.q-input {
  position: relative;
  font-size: 1rem;
  font-weight: 400;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  transition: border-color 0.2s;
}

.q-input:focus-within {
  border-color: #0266cc;
  box-shadow: 0 0 0 2px rgba(2, 102, 204, 0.2);
}

.q-field__label {
  position: absolute;
  top: -11px;
  left: 6px;
  color: #888;
  background-color: #fff;
  padding: 0 4px;
  font-size: 0.75rem;
}

.q-field__container {
  display: flex;
  align-items: center;
}

.q-field__input {
  flex: 1;
  border: none;
  outline: none;
}

.q-field__error {
  border-color: #f44336 !important;
}

.q-field__bottom {
  padding: 4px 0;
  font-size: 0.75rem;
  color: #f44336;
}

.q-field__message {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 8px;
}

.q-icon--dark {
  color: #f44336;
}
</style>
