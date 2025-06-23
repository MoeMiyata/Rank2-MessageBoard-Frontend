import axios from "axios";
import { hostUrl } from './hostUrl.ts';

export const requestEmailVerification = async (name: string, email: string, password: string) => {
  const url = hostUrl + `/user/request-verification`;
  console.log("In requestEmailVerification!:", url);
  try {
    const res = await axios.post(url, {
      name,
      email,
      password
    }); 
    console.log('res(requestEmailVerification):', res.data);
    return res.data;

  } catch (error: any) {
    return error;
  }
}

export const requestChangePassword = async (token: string, name: string, email:string) => {
  const url = hostUrl + `/user/change-password`;
  console.log("In requestChangePassword!:", url);
  try {
    const res = await axios.post(url, {
      token,
      name,
      email
    }); 
    console.log('res(requestChangePassword):', res.data);
    return res.data;

  } catch (error: any) {
    return error;
  }
}