import { useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEventApi } from "@/src/api/event";

function DeleteEventModal({ triggerButton, eventData }) {
  const [open, setIsOpen] = useState(false);

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteEventApi,
    onError: (error) => {
      console.log(error);
      toast({
        title: "Ops!",
        description: "Erro ao excluir o evento, tente mais tarde!",
        variant: "destructive",
      });
      setIsOpen(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events-list"] });
      toast({
        title: "Sucesso!",
        description: "Evento excluído com sucesso!!",
      });
      setIsOpen(false);
    },
  });

  async function handleDeleteEvent() {
    mutate(eventData._id);
  }
  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem Certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Está ação não pode ser desfeita, e os usuários convidados serão
            notificados da exclusão
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <Button
            isLoading={isPending}
            onClick={handleDeleteEvent}
            className="w-full md:w-32"
          >
            Excluir
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteEventModal;
