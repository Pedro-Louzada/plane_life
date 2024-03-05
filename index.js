/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {AppRegistry} from 'react-native';
import App from '../planeLife/src/app/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
