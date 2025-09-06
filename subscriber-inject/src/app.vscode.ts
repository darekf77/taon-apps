import { Utils } from 'tnp-core/src';
import { CommandType, executeCommand } from 'tnp-helpers/src';
import type { ExtensionContext } from 'vscode';

const group = 'SubscriberInject CLI essentials';

export const commands: CommandType[] = (
  [
    {
      title: 'hello world SubscriberInject',
      exec: ({ vscode }) => {
        vscode.window.showInformationMessage('Hello World! SubscriberInject');
      },
    },
    {
      title: 'hey SubscriberInject! show platform',
      exec: ({ vscode }) => {
        vscode.window.showInformationMessage(
          `SubscriberInject platform is "${process.platform}"`,
        );
      },
    },
  ] as CommandType[]
).map(c => {
  if (!c.group) {
    c.group = group;
  }
  if (!c.command) {
    c.command = `extension.${Utils.camelize(c.group)}.${Utils.camelize(c.title)}`;
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