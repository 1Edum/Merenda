export const Links = [
  { name: "Adicionar Alimento", link: "/kitchen/inserir" },
  { name: "Adicionar Refeição", link: "/" },
];

export function Open() {
  return (
    <div className="flex flex-col gap-[4px]">
      <div className="w-5 h-[3px] rounded-md bg-primary"></div>
      <div className="w-5 h-[3px] rounded-md bg-primary"></div>
      <div className="w-5 h-[3px] rounded-md bg-primary"></div>
    </div>
  );
}
export function Close() {
  return (
    <div className=" w-4 h-4 relative pt-[6px]">
      <div className="absolute w-full h-[3px] rounded-md bg-primary transform rotate-45"></div>
      <div className="absolute w-full h-[3px] rounded-md bg-primary transform -rotate-45"></div>
    </div>
  );
}
