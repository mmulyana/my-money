"use client";

import { Fragment, useState } from "react";
import { format } from "date-fns";
import {
  IconDots,
  IconPlus,
  IconPencil,
  IconTrashFilled,
  IconCaretUpFilled,
  IconCaretDownFilled,
  IconCheck,
} from "@tabler/icons-react";

import ProgressBar from "@/shared/components/common/progress-bar";
import { ModeItem, ModeProvider } from "@/shared/components/ui/mode";
import { Calendar } from "@/shared/components/ui/calendar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
} from "@/shared/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";

import { useUpdateBudget } from "../api/update-budget";
import { useGetBudget } from "../api/get-budget";
import { useUpdateBudgetItem } from "../api/update-budget-item";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import { useGetCategories } from "@/features/category/api/get-category";
import { flatten } from "../utils";
import { useCreateBudgetItem } from "../api/create-budget-item";
import { useDeleteBudgetItem } from "../api/delete-budget-item";
import WalletBadge from "@/features/wallet/components/wallet-badge";
import { useDeleteBudget } from "../api/delete-budget";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";

export default function BudgetTable({
  month,
  year,
}: {
  year: number;
  month: number;
}) {
  const { mutate: update } = useUpdateBudget();
  const { mutate: destroy } = useDeleteBudget();
  const { mutate: updateItem } = useUpdateBudgetItem();
  const { mutate: createItem } = useCreateBudgetItem();
  const { mutate: deleteItem } = useDeleteBudgetItem();

  const { data } = useGetBudget({
    month,
    year,
  });

  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const { data: categories } = useGetCategories({ type: "expense" });
  const flatCategories = flatten(categories?.data || []);

  return (
    <div className="rounded-lg bg-white border overflow-hidden shadow-xs">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-white">
            <TableHead className="h-12 w-10"></TableHead>
            <TableHead className="h-12 w-[200px] text-foreground/80">
              Name
            </TableHead>
            <TableHead className="h-12 w-[120px] text-foreground/80">
              Start
            </TableHead>
            <TableHead className="h-12 w-[120px] text-foreground/80">
              End
            </TableHead>
            <TableHead className="h-12 w-[240px] text-right text-foreground/80">
              Total
            </TableHead>
            <TableHead className="h-12 w-[240px] text-right text-foreground/80">
              Spent
            </TableHead>
            <TableHead className="h-12 w-[240px] text-right text-foreground/80">
              Remaining
            </TableHead>
            <TableHead className="h-12 min-w-[200px] text-foreground/80"></TableHead>
            <TableHead className="h-12 min-w-[100px] text-foreground/80 text-center">
              Wallet
            </TableHead>
            <TableHead className="h-12 w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((budget, idx) => {
            const selectedCategories = budget.categories.map(
              (i) => i.category.id,
            );
            return (
              <Fragment key={idx}>
                <TableRow className="hover:bg-white">
                  <TableCell className="w-10">
                    <div className="w-full flex justify-end">
                      <Button
                        size={"sm"}
                        className="w-6 h-6 rounded"
                        variant={"ghost"}
                        onClick={() => toggleRow(idx)}
                      >
                        {expandedRows.includes(idx) ? (
                          <IconCaretDownFilled size={16} />
                        ) : (
                          <IconCaretUpFilled size={16} />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="w-[200px]">
                    <ModeProvider defaultKey="view">
                      <ModeItem keyName="view">
                        {({ onActivate }) => (
                          <div className="flex gap-1 items-center transition-all ease-in group w-[200px]">
                            <p>{budget.name}</p>
                            <Button
                              onClick={() => onActivate("edit")}
                              className="p-0 h-5 w-4 rounded hidden group-hover:flex"
                              variant={"ghost"}
                            >
                              <IconPencil size={14} />
                            </Button>
                          </div>
                        )}
                      </ModeItem>

                      <ModeItem keyName="edit">
                        {({ onActivate }) => (
                          <div className="flex gap-1 items-center transition-all ease-in group w-[200px]">
                            <Input
                              defaultValue={budget.name}
                              className="w-full h-fit py-0.5 px-1 border-x-0 rounded border-transparent border bg-muted"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  const newValue = (
                                    e.target as HTMLInputElement
                                  ).value;
                                  update(
                                    {
                                      id: budget.id,
                                      name: newValue,
                                    },
                                    {
                                      onSuccess: () => {
                                        onActivate("view");
                                      },
                                    },
                                  );
                                }
                              }}
                              onBlur={() => onActivate("view")}
                            />
                          </div>
                        )}
                      </ModeItem>
                    </ModeProvider>
                  </TableCell>
                  <TableCell className="w-[120px]">
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex gap-1 items-center transition-all ease-in group w-[120px]">
                          <p>{format(new Date(budget.startAt), "dd MMM")}</p>
                          <Button
                            className="p-0 h-5 w-4 rounded hidden group-hover:flex"
                            variant={"ghost"}
                          >
                            <IconPencil size={14} />
                          </Button>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="p-1 w-fit">
                        <Calendar
                          selected={new Date(budget.startAt)}
                          captionLayout="dropdown"
                          mode="single"
                          onSelect={(date) => {
                            update({
                              id: budget.id,
                              startAt: date?.toString(),
                            });
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell className="w-[120px]">
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex gap-1 items-center transition-all ease-in group w-[120px]">
                          <p>{format(new Date(budget.endAt), "dd MMM")}</p>
                          <Button
                            className="p-0 h-5 w-4 rounded hidden group-hover:flex"
                            variant={"ghost"}
                          >
                            <IconPencil size={14} />
                          </Button>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="p-1 w-fit">
                        <Calendar
                          selected={new Date(budget.endAt)}
                          captionLayout="dropdown"
                          mode="single"
                          onSelect={(date) => {
                            update({ id: budget.id, endAt: date?.toString() });
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell className="w-[240px]">
                    <div className="w-[88px] ml-auto">
                      <ModeProvider defaultKey="view">
                        <ModeItem keyName="view">
                          {({ onActivate }) => (
                            <div className="flex gap-1 items-center justify-end transition-all ease-in group">
                              <p>{budget.total}</p>
                              <Button
                                onClick={() => onActivate("edit")}
                                className="p-0 h-5 w-4 rounded hidden group-hover:flex"
                                variant={"ghost"}
                              >
                                <IconPencil size={14} />
                              </Button>
                            </div>
                          )}
                        </ModeItem>

                        <ModeItem keyName="edit">
                          {({ onActivate }) => (
                            <Input
                              defaultValue={budget.total}
                              className="w-24 text-right h-fit py-0.5 border-x-0 rounded border-transparent border bg-muted"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  const newValue = Number(
                                    (e.target as HTMLInputElement).value,
                                  );
                                  update(
                                    {
                                      id: budget.id,
                                      total: newValue.toString(),
                                    },
                                    {
                                      onSuccess: () => {
                                        onActivate("view");
                                      },
                                    },
                                  );
                                }
                              }}
                              onBlur={() => onActivate("view")}
                            />
                          )}
                        </ModeItem>
                      </ModeProvider>
                    </div>
                  </TableCell>
                  <TableCell className="w-[240px] text-right">
                    {budget.spent}
                  </TableCell>
                  <TableCell className="w-[240px] text-right">
                    {budget.remaining}
                  </TableCell>
                  <TableCell className="w-[200px]">
                    <ProgressBar progress={budget.usage} />
                  </TableCell>
                  <TableCell className={cn("w-[100px] py-2")}>
                    <div className="flex justify-center">
                      <WalletBadge data={budget?.wallet} />
                    </div>
                  </TableCell>
                  <TableCell className="w-[80px]">
                    <div className="flex justify-end pr-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={"ghost"} size={"sm"}>
                            <IconDots size={18} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit p-1" align="end">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant={"ghost"}
                                className="rounded text-red-500 hover:text-red-600"
                                size={"sm"}
                              >
                                <IconTrashFilled />
                                <p>Delete</p>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete &quot;{budget.name}&quot;
                                  and remove related data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600"
                                  onClick={() =>
                                    destroy({
                                      id: budget.id,
                                    })
                                  }
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableCell>
                </TableRow>

                {expandedRows.includes(idx) && (
                  <>
                    {budget.categories.length > 0 && (
                      <TableRow className="border-none bg-muted/50 hover:bg-muted">
                        <TableCell className="w-10"></TableCell>
                        <TableCell className="w-[200px] text-sm text-foreground/70">
                          Category
                        </TableCell>
                        <TableCell className="w-[120px]"></TableCell>
                        <TableCell className="w-[120px]"></TableCell>
                        <TableCell className="w-[240px] text-right text-sm text-foreground/70">
                          Planned
                        </TableCell>
                        <TableCell className="w-[240px] text-right text-sm text-foreground/70">
                          Actual
                        </TableCell>
                        <TableCell className="w-[240px] text-right text-sm text-foreground/70">
                          Remaining
                        </TableCell>
                        <TableCell className="w-[200px]"></TableCell>
                        <TableCell className="w-[100px]"></TableCell>
                        <TableCell className="w-[80px]"></TableCell>
                      </TableRow>
                    )}

                    {budget.categories.map((cat, i) => (
                      <TableRow
                        key={i}
                        className={cn(
                          "border-transparent bg-muted/50 hover:bg-muted",
                        )}
                      >
                        <TableCell className={cn("w-10 py-2")}></TableCell>
                        <TableCell className={cn("w-[200px]")}>
                          {cat.category.name}
                        </TableCell>
                        <TableCell className={cn("w-[120px] py-2")}></TableCell>
                        <TableCell className={cn("w-[120px] py-2")}></TableCell>
                        <TableCell className={cn("w-[240px] py-2")}>
                          <div className="flex justify-end">
                            <Input
                              key={cat.id}
                              defaultValue={cat.planned}
                              className="w-24 text-right bg-white"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  const newValue = Number(
                                    (e.target as HTMLInputElement).value,
                                  );
                                  updateItem({
                                    id: cat.id,
                                    planned: newValue.toString(),
                                    categoryId: cat.category.id,
                                  });
                                }
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell className={cn("w-[240px] py-2 text-right")}>
                          {cat.actual}
                        </TableCell>
                        <TableCell className={cn("w-[240px] py-2 text-right")}>
                          {cat.planned - cat.actual}
                        </TableCell>
                        <TableCell className={cn("w-[200px] py-2")}>
                          <ProgressBar progress={cat.progress} />
                        </TableCell>
                        <TableCell className={cn("w-[100px] py-2")}></TableCell>
                        <TableCell className={cn("w-[80px] py-2")}>
                          <div className="w-full flex justify-end pr-2">
                            <Button
                              className="bg-transparent hover:bg-transparent group shadow-none border-transparent hover:border-border w-9"
                              variant={"secondary"}
                              onClick={() => {
                                deleteItem({ id: cat.id });
                              }}
                            >
                              <IconTrashFilled
                                className="text-[#DDDCDC] group-hover:text-red-500/80"
                                size={16}
                              />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow
                      className={cn(
                        "border-transparent bg-muted/50 hover:bg-muted/50",
                        idx < data.data.length - 1 && "border-border",
                      )}
                    >
                      <TableCell colSpan={10} className="py-0">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              size={"sm"}
                              className={cn(
                                "mb-4 gap-1 ml-10 hover:text-primary hover:bg-[#ECECEC]",

                                budget.categories.length === 0 && "mt-4",
                              )}
                              variant={"ghost"}
                            >
                              <IconPlus className="!w-4 !h-4" />
                              <span className="text-sm">New Category</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="!w-[--radix-popover-trigger-width] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search"
                                className="h-9"
                              />

                              <CommandList>
                                <CommandEmpty>No found.</CommandEmpty>
                                <CommandGroup>
                                  {flatCategories.map((i) => (
                                    <CommandItem
                                      key={i.id}
                                      value={i.id + i.name}
                                      className={cn(
                                        "flex justify-between items-center",
                                        i.parentId && "ml-4 text-foreground/80",
                                      )}
                                      onSelect={() => {
                                        createItem({
                                          categoryId: i.id,
                                          budgetId: budget.id,
                                          planned: 0,
                                        });
                                      }}
                                    >
                                      {i.name}
                                      {selectedCategories.includes(i.id) && (
                                        <IconCheck />
                                      )}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
