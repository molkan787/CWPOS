// const ApiBaseURI = 'https://apos-backend.herokuapp.com/';
// const ApiBaseURI = 'http://localhost:8081/';
const ApiBaseURI = 'http://159.203.4.193/';

export default function _url(path:string){
  return ApiBaseURI + path;
}
