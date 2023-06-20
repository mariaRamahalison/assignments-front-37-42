import { environment } from "./utils";
const uri_api = environment.api_url; 
export const getPhotoUtil = ((name)=>{
    return new Promise<string>((resolve, reject) => {
        if(name !== ""){
            resolve(`${uri_api}/photo/${name}`);
          }else{
            resolve('../assets/img/avatars/not_found.jpg');
          }
    });    
});

export const getPhotoUtilBis = ((name)=>{
  if(name !== ""){
    return(`${uri_api}/photo/${name}`);
  }else{
    return('../assets/img/avatars/not_found.jpg');
  }
})