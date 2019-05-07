// const ApiBaseURI = 'https://apos-backend.herokuapp.com/';
const ApiBaseURI = 'http://localhost:8081/'; // $UNDO

export default function _url(path:string){
  return ApiBaseURI + path;
}