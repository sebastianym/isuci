interface loginData {
  email: string;
  password: string
}

interface createData{
  fullName: string;
  account:{
    email: string;
    password: string;
  };
  age: number;
  cedula: number;
  genero: string;
  experiencia: number;
  nacionalidad: string;
  especialidad: string;
  contextura: string;
}

export const loginService = async (data: loginData) => {
  const response = await fetch('http://localhost:3000/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      //"Authorization": `Bearer ${token}`, //Agregado
    },
  })
    .then((res) => res.json())

  return response
}

export const createService = async (data: createData) => {
  const response = await fetch('http://localhost:3000/api/v1/users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      //"Authorization": `Bearer ${token}`, //Agregado
    },
  })
    .then((res) => res.json())

  return response
}
