"use client";

import { FormDataItem } from "@/data/formDataSchema";
import type { UseFormReturn } from "react-hook-form";

import { FormState } from "@/types/validations/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

export const DynamicField = ({
  fieldData,
  form,
}: {
  fieldData: FormDataItem;
  form: UseFormReturn<FormState, any, FormState>;
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldData.key}
      render={({ field: formField }) => (
        <FormItem>
          {fieldData.label && <FormLabel>{fieldData.label}</FormLabel>}
          <FormMessage />
          <FormControl>
            {(() => {
              switch (fieldData.type) {
                case "divider":
                  return <Separator />;
                case "text":
                  return (
                    <Input
                      placeholder={fieldData.placeholder}
                      {...formField}
                      value={String(formField.value)}
                    />
                  );
                case "number":
                  return (
                    <Input
                      type="number"
                      placeholder={fieldData.placeholder}
                      {...formField}
                      value={String(formField.value)}
                    />
                  );
                case "textarea":
                  return (
                    <div className="space-y-1">
                      <Textarea
                        placeholder={fieldData.placeholder}
                        {...formField}
                        value={String(formField.value)}
                      />
                      <div className="flex justify-end text-xs text-muted-foreground">
                        <span>
                          {String(formField.value).length}/120 characters
                        </span>
                      </div>
                    </div>
                  );
                case "toggle-group":
                  return (
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      value={formField.value as string}
                      onValueChange={formField.onChange}
                      defaultValue={formField.value as string}
                    >
                      {fieldData.options?.map((option: string) => (
                        <ToggleGroupItem
                          key={option}
                          value={option.toLowerCase()}
                          size="lg"
                        >
                          {option}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  );
                default:
                  return null;
              }
            })()}
          </FormControl>
        </FormItem>
      )}
    />
  );
};
