import type { ASTTransformation } from '../src/wrapAstTransformation'
import wrap from '../src/wrapAstTransformation'

import { transformAST as addImport } from './add-import'

export const transformAST: ASTTransformation = (context) => {
  const { root, j } = context
  const renderFns = root.find(j.Property, {
    key: {
      name: 'render',
    },
    value: {
      type: 'ArrowFunctionExpression',
    },
  })

  const renderMethods = root.find(j.Property, {
    key: {
      name: 'render',
    },
    value: {
      type: 'FunctionExpression'
    }
  })
  if (renderFns.length || renderMethods.length) {
    addImport(context, {
      specifier: { type: 'named', imported: 'h' },
      source: 'vue',
    })

    renderFns.forEach(({ node }) => {
      if (j.ArrowFunctionExpression.check(node.value)) {
        node.value.params.shift()
      }
    })

    renderMethods.forEach(({ node }) => {
      if (j.FunctionExpression.check(node.value)) {
        node.value.params.shift()
      }
    })
  }
}

export default wrap(transformAST)
export const parser = 'babylon'
