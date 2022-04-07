import { useEffect } from "react";
import Swal from "sweetalert2";

export function LoginSuccess() {
    useEffect(() => {
        setTimeout(() => {
            window.close();
        }, 2000);
    }, []);
    return Swal.fire({
        title: `Welcome`,
        text: "Successfully signed in",
        icon: "success",
        color: "white",
        background: "#00498b",
        confirmButtonColor: "#24c59c",
    });;
}
