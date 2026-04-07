"use client";

import { useTeams, useCreateTeam, useDeleteTeam } from "../hooks";
import { CreateTeamFormData, createTeamSchema } from "../schemas";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export const TeamsList = () => {
  const { data: teams, isLoading } = useTeams();
  const createTeam = useCreateTeam();
  const deleteTeam = useDeleteTeam();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const form = useForm<CreateTeamFormData>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: CreateTeamFormData) => {
    try {
      await createTeam.mutateAsync(data);
      setIsCreateOpen(false);
      form.reset();
    } catch (error) {
      console.error("Failed to create team", error);
    }
  };

  const handleDelete = async (teamId: string) => {
    if (confirm("Are you sure you want to delete this team?")) {
      try {
        await deleteTeam.mutateAsync(teamId);
      } catch (error) {
        console.error("Failed to delete team", error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading teams...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Teams</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="name">Team Name</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="Enter team name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...form.register("description")}
                    placeholder="Enter team description (optional)"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createTeam.isPending}>
                    {createTeam.isPending ? "Creating..." : "Create Team"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teams?.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{team.name}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(team.id)}
                  disabled={deleteTeam.isPending}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {team.description && (
                <CardDescription>{team.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {team.members.length} member
                {team.members.length !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>
        )) || []}
      </div>
    </div>
  );
};
