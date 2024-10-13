import { useEffect, useState } from "react";

export const TableMobile = (widthThreshold = 768) => {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= widthThreshold);
      };
  
      // Inicializa verificando o tamanho da tela
      handleResize();
  
      // Adiciona o event listener ao redimensionar a janela
      window.addEventListener("resize", handleResize);
  
      // Remove o event listener ao desmontar o componente
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [widthThreshold]);
  
    return isMobile;
  };
  