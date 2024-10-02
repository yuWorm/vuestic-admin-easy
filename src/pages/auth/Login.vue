<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">{{ t('auth.login') }}</h1>
    <p class="text-base mb-4 leading-5">
      {{ t('auth.createNewAccount') }}
      <RouterLink :to="{ name: 'signup' }" class="font-semibold text-primary">{{ t('auth.sign_up') }}</RouterLink>
    </p>
    <VaInput
      v-model="formData.username"
      :rules="[validators.required]"
      class="mb-4"
      :label="t('auth.username')"
      type="username"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        :label="t('auth.password')"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <VaCheckbox v-model="formData.keepLoggedIn" class="mb-2 sm:mb-0" :label="t('auth.remeberMe')" />
      <RouterLink :to="{ name: 'recover-password' }" class="mt-2 sm:mt-0 sm:ml-1 font-semibold text-primary">
        {{ t('auth.forgotPassword') }}
      </RouterLink>
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> {{ t('auth.login') }}</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vuestic-ui'
import { validators } from '@/services/utils'
import userApi from '@/api/user/'
import { Message } from '@/utils/message'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user-store'

const { validate } = useForm('form')
const { push } = useRouter()
const { t } = useI18n()

const formData = reactive({
  username: '',
  password: '',
  keepLoggedIn: false,
})

const userStore = useUserStore()

const submit = async () => {
  if (validate()) {
    try {
      await userStore.login(formData.username, formData.password)
      Message.success(t('auth.welecome'))
      await push({ name: 'dashboard' })
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
