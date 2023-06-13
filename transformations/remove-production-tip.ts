import { Options } from 'jscodeshift'
import wrap from '../src/wrapAstTransformation'
import type { ASTTransformation } from '../src/wrapAstTransformation'

export const transformAST: ASTTransformation<Options> = ({ root, j }) => {
  const productionTipAssignment = root.find(
    j.AssignmentExpression,
    (n) =>
      j.MemberExpression.check(n.left) &&
      j.Identifier.check(n.left.property) &&
      n.left.property.name === 'productionTip' &&
      j.MemberExpression.check(n.left.object) &&
      j.Identifier.check(n.left.object.property) &&
      n.left.object.property.name === 'config' &&
      j.Identifier.check(n.left.object.object) &&
      n.left.object.object.name === 'Vue'
  )
  productionTipAssignment.remove()
}

export default wrap(transformAST)
export const parser = 'babylon'
