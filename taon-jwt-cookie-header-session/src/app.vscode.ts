import { Utils } from 'tnp-core/src';
import { CommandType, executeCommand } from 'tnp-helpers/src';
import type { ExtensionContext } from 'vscode';

const group = 'TaonJwtCookieHeaderSession CLI essentials';

export const commands: CommandType[] = (
  [
    {
      title: 'hello world TaonJwtCookieHeaderSession',
      exec: ({ vscode }) => {
        vscode.window.showInformationMessage('Hello World! TaonJwtCookieHeaderSession');
      },
    },
    {
      title: 'hey TaonJwtCookieHeaderSession! show platform',
      exec: ({ vscode }) => {
        vscode.window.showInformationMessage(
          `TaonJwtCookieHeaderSession platform is "${process.platform}"`,
        );
      },
    },
  ] as CommandType[]
).map(c => {
  if (!c.group) {
    c.group = group;
  }
  if (!c.command) {
    c.command = `extension.${Utils.camelize(c.group ?? 'ROOT')}.${Utils.camelize(c.title)}`;
  }
  return c;
});

export function activate(context: ExtensionContext): void {
  for (let index = 0; index < commands.length; index++) {
    const {
      title = '',
      command = '',
      exec = '',
      options,
      isDefaultBuildCommand,
    } = commands[index];
    const sub = executeCommand(
      title,
      command,
      exec,
      options,
      isDefaultBuildCommand,
      context,
    );
    if (sub) {
      context.subscriptions.push(sub);
    }
  }
}

export function deactivate(): void {}

export default { commands };