export const window = {
  showWarningMessage: console.warn,
  showInformationMessage: console.info,
  showErrorMessage: console.error,
  createOutputChannel: () => ({
    appendLine: () => ({})
  })
}

export const workspace = {}
export const env = {}

export class TreeItem {
  constructor() {

  }
}

export class ViewColumn {

}

export class Uri {}

export class TreeItemCollapsibleState {

}

export class EventEmitter {}
