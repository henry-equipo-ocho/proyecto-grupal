import { useEffect } from "react";
import swal from "sweetalert";

export function LoginSuccess() {
    useEffect(() => {
        setTimeout(() => {
            window.close();
        }, 2000);
    }, []);
    return swal("Thanks for Login");
}
