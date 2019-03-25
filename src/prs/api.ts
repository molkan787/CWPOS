const ApiBaseURI = 'http://localhost:8081/';

export default function _url(path:string){
  return ApiBaseURI + path;
}