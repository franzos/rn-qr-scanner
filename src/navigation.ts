import {HomeScreen} from './screens/home';
import {LoadingScreen} from './screens/loading';
import {PermissionsScreen} from './screens/permissions';
import {BarcodeScannerScreen} from './screens/scanner';

export const Navigation = {
  home: {
    component: HomeScreen,
    name: 'Home',
  },
  permissions: {
    component: PermissionsScreen,
    name: 'Permissions',
  },
  barcodeScanner: {
    component: BarcodeScannerScreen,
    name: 'Scanner',
  },
  loading: {
    component: LoadingScreen,
    name: 'Loading ...',
  },
};
