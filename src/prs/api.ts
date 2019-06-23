import config from '@/config';
// const ApiBaseURI = 'https://apos-backend.herokuapp.com/';
// const ApiBaseURI = 'http://localhost:8081/';
let ApiBaseURI = ''; // = 'http://159.203.4.193/';
let ApiBaseURIDemo = '';
if (config.devMode) {
  ApiBaseURI = 'http://localhost:8081/';
  ApiBaseURIDemo = 'http://localhost:8081/';
}else{
  ApiBaseURI = 'http://159.203.4.193/';
  ApiBaseURIDemo = 'http://159.203.4.193:81/';
}

function _url(path: string) {
  if (config.demoMode) {
    return ApiBaseURIDemo + path;
  } else {
    return ApiBaseURI + path;
  }
}

export default _url;

// @ts-ignore
window._url = _url;
