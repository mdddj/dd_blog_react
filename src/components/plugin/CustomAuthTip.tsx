import { PluginComponent } from 'react-markdown-editor-lite';
import UserStateTipWidget from '@/widgets/UserStateTipWidget';

export default class CustomAuthTip extends PluginComponent {
  static pluginName = 'custom-auth';
  static align = 'left';

  render() {
    return (
      <UserStateTipWidget
        logined={
          <span
            style={{
              color: 'green',
            }}
          >
            管理员
          </span>
        }
      >
        <span
          style={{
            color: 'red',
          }}
        >
          鉴权失败
        </span>
      </UserStateTipWidget>
    );
  }
}
