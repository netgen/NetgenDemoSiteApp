# Netgen Demo Site App

Netgen Demo Site App is a prototype application built with React Native (v0.33) that fetches content from eZ Publish REST API. Application was built for experimental purposes in order to test feasibility of making cross-platform mobile applications atop of eZ CMS.

## Installation

These instructions will get you a copy of the project up and running on your local machine for development purposes. Instructions will cover dependencies for both Android and iOS platform.

Note that **only macOS users can run project on iOS.**

### Prerequisites

Before installing the project, you'll need Node.js, the React Native command line interface and Android Studio. Additionally, if you are macOS user you'll also need Xcode (for building iOS application), while installing Watchmen is also highly recommended. For more reference check [the official React Native docs](https://facebook.github.io/react-native/docs/getting-started.html#content).

iOS users can install Node.js and Watchmen Homebrew:
```
brew install node
brew install watchman
```

For installing Node.js on Windows, or one of the Linux distributions, check the [following instructions](https://nodejs.org/en/download/package-manager/).

Node.js comes with `npm`, which lets you install the React Native command line interface:
```
npm install -g react-native-cli
```
##### Android Studio installation

Download and install [Android Studio](https://developer.android.com/studio/install.html) if you wish to build and run an application on Android. Additionally, follow official React Native getting started instructions (choose Android and OS you are using) in order to setup whole Android ecosystem properly (Android Studio does not come with Virtual Devices by default). Have in mind that Java Development Kit 1.8 or higher is a base requirement for Android Studio.

##### Xcode installation (macOS users only)

In order to run an application on iOS, install Xcode is via the [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835). Xcode comes with the iOS Simulator and all the required tools to build a iOS app, so installation should be fairly simple.

### Installing the project

After installing all the prerequisites, clone the project and install project dependencies. To do so, open your terminal and enter:
```
git clone https://github.com/netgen/NetgenDemoSiteApp.git
cd NetgenDemoSiteApp
npm install
```

Provide content to an application by editing `ngdemoappconfig.json.example` file in project root and removing `.example` suffix. Properties `restEndpointUrl` and `siteInfoContentID` are mandatory, while `articlesPerCategory` and `contentTypes` will fallback to default values. Defining `contentTypes` is also highly recommended. Configuration `restEndpointUrl` defines url of eZ installation from which application will fetch content, while `siteInfoContentID` should be content ID of a, so called, SITE INFO object where content categories are defined. It is an eZ object which must have a `main_menu` object relation list field, which references objects that represent categories used in application.

##### iOS requirement only: Adding your domain to NSExceptionDomains
If your REST endpoint does not use HTTPS, you will have to modify `ios/NetgenMoreSiteApp/Info.plist` file manually in order to fetch content on iOS application. Simply, add the following inside of `NSExceptionDomains` and change `example.com` with your endpoint:
```
<key>example.com</key>
<dict>
  <key>NSExceptionAllowsInsecureHTTPLoads</key>
  <true/>
</dict>
```

### Running the app

Finally, you can build and run the application in simulator by typing the following instructions in your terminal:
* **iOS:** `react-native run-ios`
* **Android:** `react-native run-android`

While iOS simulator will start automatically after running `react-native run-ios`, you'll have to start Android Virtual Device manually before running `react-native run-android`. For more information about run Android Virtual Devices (AVD) follow [this link](https://developer.android.com/studio/run/managing-avds.html).
It's also possible to run application live on physical device, which is further explained [here](http://facebook.github.io/react-native/docs/running-on-device.html).

Since React Native still doesn't have stable version (by SemVer), it's very likely that you might run into troubles with setting the project up. Try finding a solution on StackOverflow, because there are a lot of generic issues solved there. However, if you can't solve the issue on your own, don't hesitate with contacting contributor(s) for a help.

## Contributing

Contributions of any kind are welcome. Before submitting the pull request, please make sure your code follows projects linter rules.

## Other useful resources/open-source projects for learning React Native
* React Native NBA App: https://github.com/wwayne/react-native-nba-app
* F8App: https://github.com/fbsamples/f8app
* Snowflake: https://github.com/bartonhammond/snowflake
* Awesome React Native: https://github.com/jondot/awesome-react-native
* And of course official docs: https://facebook.github.io/react-native/docs

## Should be implemented or fixed:
- [ ] Bug: Webview on Android breaks after opening external resource that has redirects
- [ ] Feature: Share on social networks
- [ ] Feature: Search
