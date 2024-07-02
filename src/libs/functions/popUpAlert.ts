import Swal from "sweetalert2";

export const successAlert = (title: string, message: string) => {
    Swal.fire({
        title: title,
        text: message,
        icon: 'success',
        background: '#1F2937',
        color: '#d2d3e0bf',
        allowEnterKey: true,
        confirmButtonText: "De acuerdo",
        padding: '35px',
    });
}

export const errorAlert = (title: string, message: string) => {
    Swal.fire({
        title: title,
        text: message,
        icon: 'error',
        background: '#1F2937',
        color: '#d2d3e0bf',
        allowEnterKey: true,
        confirmButtonText: "De acuerdo",
        padding: '35px',
    });
}
