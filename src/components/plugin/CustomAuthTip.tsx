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
              marginLeft: 12,
            }}
          >
            管理员
          </span>
        }
      >
        <span
          style={{
            color: 'red',
            marginLeft: 12,
          }}
        >
          鉴权失败
        </span>
      </UserStateTipWidget>
    );
  }
}
