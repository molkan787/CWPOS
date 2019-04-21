// const ApiBaseURI = 'http://40.85.223.123/';
const ApiBaseURI = 'http://localhost:8081/'; // $UNDO

export default function _url(path:string){
  return ApiBaseURI + path;
}