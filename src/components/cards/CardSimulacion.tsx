"use client";
import { IoBicycle } from "react-icons/io5";

interface CardProps {
  nombre: string;
  tipoCarrera: string;
  icon: any;
  escuadras: number;
  onAdd: () => void;
}

function Card({ nombre, tipoCarrera, icon, escuadras, onAdd }: CardProps) {
  return (
    <div className="container mx-auto bg-white flex items-center justify-between m-2 rounded-md p-2 w-full shadow-md">
      <div className="flex items-center justify-between p-1">
        <div className="flex justify-center items-center mr-3 bg-black/80 p-5 rounded-md">
          {icon}
        </div>
        <div>
          <h2 className="font-bold text-black text-md">
            {nombre} ({tipoCarrera})
          </h2>
          <p className="text-black">Número de escuadras inscritas: {escuadras}</p>
        </div>
      </div>
      <div className="flex">
        <button
          className="flex bg-[#478CCF] rounded-md justify-between items-center p-2 mr-2"
          onClick={onAdd}
        >
          <div className="text-white">Simular</div>
        </button>
      </div>
    </div>
  );
}

export default Card;
