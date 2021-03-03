import { NuxtHTTPInstance } from '@nuxt/http'

declare module 'vue/types/vue' {
  interface Vue {
    $http: NuxtHTTPInstance
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $http: NuxtHTTPInstance
  }

  interface Content {
    $http: NuxtHTTPInstance
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $http: NuxtHTTPInstance
  }
}
