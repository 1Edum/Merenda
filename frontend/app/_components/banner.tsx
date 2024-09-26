import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

export default function Banner() {
  return (
    <Card className="bg-secondary text-center p-5 flex flex-col items-center">
      <CardHeader>
        <CardTitle className="text-4xl uppercase font-semibold py-3">Sesi Merenda</CardTitle>
        <CardDescription>
          Plataforma de apoio à alimentação para alunos e cozinheiros do SESI.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 w-64 mt-6">
        <Link href={"/login"}>
          <Button>Entrar </Button>
        </Link>
        <Link href={"/cadastrar"}>
          <Button>Não é Aluno ainda? </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
