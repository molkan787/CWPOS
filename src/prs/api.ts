import config from '@/config';
// const ApiBaseURI = 'https://apos-backend.herokuapp.com/';
// const ApiBaseURI = 'http://localhost:8081/';
let ApiBaseURI = ''; // = 'http://159.203.4.193/';
if(config.devMode){
  ApiBaseURI = 'http://localhost:8081/';
}else{
  ApiBaseURI = 'http://159.203.4.193/';
}

console.log(ApiBaseURI)

export default function _url(path:string){
  return ApiBaseURI + path;
}
