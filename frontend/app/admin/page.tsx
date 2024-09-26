import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import React from "react";
import { PlusCircle, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../_components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../_components/ui/select";
import TableInfos from "../_components/table-infos";


export default function page() {
  return (
    <div className="P-6 max-w-4xl mx-auto space-y-2">
      <TableInfos />
    </div>
  );
}
