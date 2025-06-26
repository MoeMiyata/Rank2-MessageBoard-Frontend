import axios from "axios";
import { hostUrl } from "./hostUrl";

export const varifyReCAPTCHA = async (props) => {
    const { token } = props

    try {
        const res = await axios.post(`${hostUrl}/user/verify-reCAPTCHA`, { recaptchaToken: token });
        console.log('登録成功:', res.data);
        return res
    } catch (error) {
        console.error('登録エラー:', error);
        return error
    }
}
