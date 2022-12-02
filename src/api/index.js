import instance from "./request2"
export const GetDataList=()=>{
    return instance.then((res)=>{
        console.log(res);
    })
}