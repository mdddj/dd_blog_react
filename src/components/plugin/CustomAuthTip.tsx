import { PluginComponent } from 'react-markdown-editor-lite';
import UserStateTipWidget from '@/widgets/UserStateTipWidget';

export default class CustomAuthTip extends PluginComponent {
  static pluginName = 'custom-auth';
  static align = 'left';

  render() {
    return (
      <UserStateTipWidget
        logined={(user) => {
          return (
            <span
              style={{
                color: 'green',
                marginLeft: 12,
              }}
            >
              {user.nickName}
            </span>
          );
        }}
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
