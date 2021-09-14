<template>
  <div class="external-view">
    <el-container>
      <el-header class="header d-flex justify-between w-100" height="40px">
        <Logo class="logo" variant="blue" />
        <div class="d-flex justify-end w-100">
          <el-button size="small" type="primary" @click="signUp = true">
            Cadastro
          </el-button>
          <el-button size="small" @click="signUp = false">
            Entrar
          </el-button>
        </div>
      </el-header>

      <div class="external-container h-100">
        <div class="external-container__image">
          <h1 class="title">
            <div>Conectando</div>
            <div>os <strong class="highlight">melhores alunos</strong></div>
            <div>às <strong class="highlight">melhores empresas</strong></div>
          </h1>
          <img
            src="@/assets/images/business_deal.svg"
            alt="Pessoas fazendo negócio"
            class="image"
          />
        </div>
        <div class="external-container__forms">
          <el-card v-loading="$store.getters.loading" class="box-card">
            <transition name="fade">
              <div
                v-if="signUp"
                key="1"
                class="external-container__forms__register"
              >
                <h2>{{ title }}</h2>
                <RegisterForm @back-to-login="signUp = false" />
              </div>
              <div v-else key="2" class="external-container__forms__login">
                <h2>{{ title }}</h2>
                <LoginForm />
              </div>
            </transition>
          </el-card>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import Logo from '@/components/Logo/Logo.vue'
import LoginForm from '@/components/Auth/LoginForm.vue'
import RegisterForm from '@/components/Auth/RegisterForm.vue'

export default {
  components: {
    Logo,
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      signUp: false
    }
  },
  computed: {
    title() {
      return this.signUp ? 'Novo cadastro' : 'Acesso ao sistema'
    }
  },
  mounted() {
    this.$store.commit('LOGOUT_CURRENT_USER')
    this.$store.commit('CLEAR_PROJECTS')
    this.$store.commit('HIDE_LOADING')
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.external-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  background-color: $--default-hover-color;

  &__image {
    width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
  &__forms {
    width: 450px;
    margin: auto;
  }
}

@media (max-width: 1000px) {
  .external-container {
    display: grid;
    grid-template-columns: 1fr;

    &__image {
      display: none;
    }
  }
}

@media (max-width: 500px) {
  .external-view {
    .header {
      height: 60px !important;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .logo {
        margin-bottom: 10px;
      }
      .el-button {
        width: 100% !important;
      }
    }
  }
  .external-container {
    &__forms {
      width: 100%;
      margin: auto;
    }
  }
}

.external-view {
  background-color: $--default-hover-color;
  .content {
    margin-bottom: 60px;
    align-items: center;
  }
  .title {
    font-size: 2rem;
    font-weight: 300;
    .highlight {
      color: $--color-primary;
    }
  }
  .image {
    width: 350px;
    max-width: 100%;
    margin-right: 1rem;
    margin-top: 2rem;
  }
  .el-card {
    margin-top: 0.5rem;
    text-align: center;
    // max-width: 400px;
  }
  h2 {
    margin: 0.5rem 0 1rem;
  }
}
</style>
