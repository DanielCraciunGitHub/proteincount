import { PlusCircle, Trash2 } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

import { FormState, mealSizes, mealTypes } from "@/types/validations/form";

import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

export const MealsInput = ({
  form,
}: {
  form: UseFormReturn<FormState, any, FormState>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "meals",
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex items-center gap-3 bg-muted/20 p-3 rounded-md"
        >
          <div className="flex-1 space-y-4">
            <div className="flex gap-24">
              <FormField
                control={form.control}
                name={`meals.${index}.mealOrSnack`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select meal type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mealTypes.map((type) => (
                          <SelectItem
                            key={type}
                            value={type.toLowerCase()}
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`meals.${index}.size`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mealSizes.map((size) => (
                          <SelectItem
                            key={size}
                            value={size.toLowerCase()}
                          >
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive/90 self-center"
                onClick={() => remove(index)}
                type="button"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>

            <FormField
              control={form.control}
              name={`meals.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your meal using at least 20 characters"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() =>
          append({
            mealOrSnack: "snack",
            size: "medium",
            description: "",
          })
        }
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Meal
      </Button>
    </div>
  );
};
