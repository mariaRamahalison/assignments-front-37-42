import { environment } from "./utils";

export const getPhotoUtil = ((name)=>{
    const uri_api = environment.api_url; 
    return new Promise<string>((resolve, reject) => {
        if(name !== ""){
            resolve(`${uri_api}/photo/${name}`);
          }else{
            resolve('../assets/img/avatars/not_found.jpg');
          }
    });
})