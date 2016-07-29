import { ENV } from './config';

require('expose?$!expose?jQuery!jquery');
require('bootstrap-loader');
require('./../style/main.scss');
if (ENV === 'development') {
	require('./../index.html');
}

console.log(ENV);
