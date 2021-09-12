<template>
  <div class="w-100">
    <div class="public-profile-skills w-100">
      <div v-if="!editingProfile" class="public-profile-skills__content">
        <markdown-it-vue
          class="markdown-content pl-3"
          :options="options"
          :content="
            getMarkdownContent ? getMarkdownContent : defaultMarkdownContent
          "
        />
      </div>
      <el-tabs v-else class="public-profile-skills__edition" type="card">
        <el-tab-pane label="Editar perfil">
          <ResizeAuto>
            <template v-slot:default="{ resize }">
              <textarea
                id="publicProfileTextArea"
                ref="publicProfileTextArea"
                v-model="publicProfile"
                rows="2"
                class="public-profile-skills__markdown-textarea w-100"
                placeholder="Comece a escrever o seu perfil público (="
                @input="resize"
                @focus="resize"
              />
            </template>
          </ResizeAuto>
        </el-tab-pane>
        <el-tab-pane label="Visualizar perfil">
          <markdown-it-vue
            class="markdown-content px-3"
            :content="getMarkdownContent"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

import ResizeAuto from './ResizeAuto.vue'

export default {
  components: {
    ResizeAuto,
    'markdown-it-vue': MarkdownItVue
  },
  props: ['editingProfile', 'studentName', 'markdownProfile'],
  data() {
    return {
      result: null,
      publicProfile: null,
      options: {
        image: {
          hAlign: 'center'
        }
      }
    }
  },
  computed: {
    getMarkdownContent() {
      if (!this.publicProfile) return ''
      return this.publicProfile.toString()
    },
    defaultMarkdownContent() {
      return `### Olá! Meu nome é ${this.studentName} 🙂. \n
      `
    },
    markdownWithCustomContainers() {
      return this.addCustomContainers(this.publicProfile)
    }
  },
  watch: {
    editingProfile() {
      this.$nextTick(() => {
        if (this.editingProfile) {
          this.$refs.publicProfileTextArea.focus()
        }
      })
    }
  },
  mounted() {
    this.publicProfile = this.markdownProfile
  },
  methods: {}
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.public-profile-skills {
  border-radius: 4px;
  width: 100%;
  height: fit-content;

  &__content {
    border: 1px solid $--default-border-color;
    border-radius: 4px;
    padding: 12px;
  }
  &__markdown-textarea {
    border: 0;
    outline: none;
    resize: none;
  }
  &__edition {
    .el-tabs {
      &__header {
        margin: 0;
        border: 0;
      }
      &__content {
        border: 1px solid #e4e7ed;
        border-radius: 0 4px 4px 4px;

        .el-tab-pane {
          padding: 12px;
        }
      }
      &__item:not(.is-active) {
        background-color: rgb(242, 242, 242);
      }
    }
    .markdown-content {
      li {
        list-style-type: disc !important;
      }
    }
  }
}

@media (max-width: 900px) {
  .public-profile-skills {
    &__content {
      padding: 8px;
    }
  }
}
</style>
