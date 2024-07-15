import Swal from "sweetalert2";

export const successAlert = (title: string, message: string) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "success",
    background: "#F3F3F7",
    color: "#000",
    allowEnterKey: true,
    confirmButtonText: "De acuerdo",
    padding: "35px",
  });
};

export const errorAlert = (title: string, message: string) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "error",
    background: "#F3F3F7",
    color: "#000",
    allowEnterKey: true,
    confirmButtonText: "De acuerdo",
    padding: "35px",
  });
};

export const warningAlert = (title: string, message: string) => {
    Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        background: '#F3F3F7',
        color: '#000',
        allowEnterKey: true,
        confirmButtonText: "De acuerdo",
        padding: '35px',
    });
}

export const confirmAlert = async (
  title: string,
  message: string
) => {
  return new Promise<boolean>((resolve) => {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: `Cancelar`,
      focusDeny: true,
      background: "#F3F3F7",
      color: "#000",
      padding: "35px",
      confirmButtonColor: "#2e786b",
      cancelButtonColor: "#e53e3e",
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

