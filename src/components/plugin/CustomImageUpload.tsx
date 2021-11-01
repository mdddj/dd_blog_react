import { PluginComponent } from 'react-markdown-editor-lite';
import * as React from 'react';
import { CloudUpload } from '@material-ui/icons';

export default class CustomImageUpload extends PluginComponent {
  // 这里定义插件名称，注意不能重复
  static pluginName = 'my-image-upload';
  // 定义按钮被防止在哪个位置，默认为左侧，还可以放置在右侧（right）
  static align = 'left';

  render() {
    return (
      <CloudUpload
        className={'button button-type-clear'}
        style={{ fontSize: 16 }}
      />
    );
  }
}
