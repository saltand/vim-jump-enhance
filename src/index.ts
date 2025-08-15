import { defineExtension } from 'reactive-vscode'
import { commands, Range, window } from 'vscode'

const { activate, deactivate } = defineExtension(() => {
  const cmd = commands.registerTextEditorCommand('vim.enhance.jump', async (_textEditor, _edit) => {
    const editor = window.activeTextEditor
    if (!editor)
      return

    const doc = editor.document
    const pos = editor.selection.active

    // 匹配括号
    const charAt = doc.getText(new Range(pos, pos.translate(0, 1)))
    const isBracket = '(){}[]'.includes(charAt)
    if (isBracket) {
      await commands.executeCommand('editor.action.jumpToBracket')
      return
    }

    // 匹配标签
    const supportedLanguages = ['html', 'xml', 'vue', 'javascriptreact', 'typescriptreact']
    if (supportedLanguages.includes(doc.languageId)) {
      await commands.executeCommand('editor.emmet.action.matchTag')
    }
  })

  return () => {
    cmd.dispose()
  }
})

export { activate, deactivate }
