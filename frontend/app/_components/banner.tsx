import React from "react";
import Link from "next/link";
import Button from "./button";

export default function Banner() {
  return (
    <div className="bg-secondary text-center p-5 flex flex-col items-center">
      <h1 className="text-4xl uppercase font-semibold py-3">Sesi Merenda</h1>
      <p>
        Plataforma de apoio à alimentação para alunos e cozinheiros do SESI.
      </p>
      <div className="py-4 flex flex-col gap-3 md:w-96 w-full justify-center">
        <Link href={"/login"}>
          <Button>Entrar </Button>
        </Link>
        <Link href={"/cadastrar"}>
          <Button>Não é Aluno ainda? </Button>
        </Link>
      </div>
    </div>
  );
}
