import { mealSizes, mealTypes } from "@/form/formDataSchema";
import { FormState } from "@/form/formZodSchema";
import { PlusCircle, Trash2 } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
          className="flex flex-col bg-muted/20 p-3 rounded-md"
        >
          <div className="flex-1 space-y-4 w-full">
            <div className="flex flex-row gap-4 sm:gap-6">
              <FormField
                control={form.control}
                name={`meals.${index}.mealOrSnack`}
                render={({ field }) => (
                  <FormItem className="flex-1">
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
                  <FormItem className="flex-1">
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
                className="text-destructive hover:text-destructive/90 self-start sm:self-center mt-6 sm:mt-0"
                onClick={() => {
                  if (fields.length > 1) {
                    remove(index);
                  }
                }}
                type="button"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>

            <FormField
              control={form.control}
              name={`meals.${index}.description`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your meal using at least 20 characters"
                      rows={3}
                      className="w-full"
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
