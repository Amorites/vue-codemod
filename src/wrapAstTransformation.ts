import type { JSCodeshift, Transform, Core ,Options } from 'jscodeshift'

export type Context = {
  root: ReturnType<Core>
  j: JSCodeshift
  filename: string
}

// 现在就不太满足了，下面要求必须是个 object, 不能传空（感觉是 bug 吧，但好像是新改的？）
// 要不我简单 patch 一下得了
export type ASTTransformation<Params = {}> = {
  (context: Context, params: Params): void
}

export default function astTransformationToJSCodeshiftModule<Params extends Options = any>(
  transformAST: ASTTransformation<Params>
): Transform {
  // 感觉 options 应该是可选的才对吧？ 先不纠结，假设他的类型是对的
  const transform: Transform = (file, api, options: Params) => {
    const j = api.jscodeshift
    const root = j(file.source)

    // 这个方法不一定需要接受 options 参数，要改成一定会接受吗？
    transformAST({ root, j, filename: file.path }, options)

    return root.toSource({ lineTerminator: '\n' })
  }

  return transform
}
