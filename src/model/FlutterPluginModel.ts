export interface FlutterPluginInfo {
  version: string;
  pubspec: Pubspec;
  archive_url: string;
  published: Date;
}

export interface Pubspec {
  name: string;
  description: string;
  version: string;
  homepage: string;
  environment: Environment;
  dependencies: Dependencies;
  dev_dependencies: DevDependencies;
  flutter: PubspecFlutter;
}

export interface Dependencies {
  flutter: FlutterWebPluginsClass;
  dio: string;
  get: string;
  logger: string;
  flutter_web_plugins: FlutterWebPluginsClass;
}

export interface FlutterWebPluginsClass {
  sdk: string;
}

export interface DevDependencies {
  flutter_test: FlutterWebPluginsClass;
}

export interface Environment {
  sdk: string;
  flutter: string;
}

export interface PubspecFlutter {
  plugin: Plugin;
}

export interface Plugin {
  platforms: Platforms;
}

export interface Platforms {
  android: Android;
  ios: Ios;
}

export interface Android {
  package: string;
  pluginClass: string;
}

export interface Ios {
  pluginClass: string;
}
