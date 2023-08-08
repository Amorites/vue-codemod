import { defineInlineTest } from 'jscodeshift/src/testUtils'
import transform from '../remove-production-tip';

defineInlineTest(transform, {}, `Vue.config.productionTip = true`, ``)
