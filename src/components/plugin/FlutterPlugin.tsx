import { PluginComponent } from 'react-markdown-editor-lite';
import FlutterPluginAddWidget from '@/widgets/FlutterPluginAddWidget';

/// 引入flutter插件小部件
export default class FlutterPlugin extends PluginComponent {
  static pluginName = 'flutter-plugin';
  static align = 'left';

  render() {
    return (
      <FlutterPluginAddWidget
        insertText={(val) => {
          this.editor.insertText(val);
        }}
      />
    );
  }
}
