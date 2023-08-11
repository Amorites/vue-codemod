
import { defineTest } from './testUtils'

// 这里面居然还依赖了 global 的 expect, describe, it，不知道能不能正常用
defineTest(__dirname, 'vuex-v4', {}, 'vuex-v4/store', {})
defineTest(__dirname, 'vuex-v4', {}, 'vuex-v4/vuex-dot-store', {})
defineTest(__dirname, 'vuex-v4', {}, 'vuex-v4/import-alias', {})

