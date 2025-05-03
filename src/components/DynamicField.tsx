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
                      value={
                        formField.value === undefined
                          ? ""
                          : String(formField.value)
                      }
                    />
                  );
                case "number":
                  return (
                    <Input
                      type="number"
                      placeholder={fieldData.placeholder}
                      {...formField}
                      value={
                        formField.value === undefined
                          ? ""
                          : String(formField.value)
                      }
                    />
                  );
                case "textarea":
                  return (
                    <div className="space-y-1">
                      <Textarea
                        placeholder={fieldData.placeholder}
                        {...formField}
                        value={
                          formField.value === undefined
                            ? ""
                            : String(formField.value)
                        }
                      />
                      <div className="flex justify-end text-xs text-muted-foreground">
                        <span>
                          {
                            (formField.value === undefined
                              ? ""
                              : String(formField.value)
                            ).length
                          }
                          /120 characters
                        </span>
                      </div>
                    </div>
                  );
                case "heightInput":
                  const heightUnit = form.watch("height.unit");
                  const heightFeet = form.watch("height.feet");
                  const heightInches = form.watch("height.inches");
                  const heightCm = form.watch("height.cm");
                  return (
                    <div className="space-y-2">
                      <ToggleGroup
                        type="single"
                        variant="outline"
                        value={heightUnit || "cm"}
                        onValueChange={(value) => {
                          if (value) {
                            formField.onChange({
                              ...((formField.value as any) || {}),
                              unit: value,
                            });
                          }
                        }}
                      >
                        {fieldData.options?.map((option: string) => (
                          <ToggleGroupItem key={option} value={option}>
                            {option}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>

                      {heightUnit === "feet" ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Feet"
                            value={
                              heightFeet === undefined ? "" : heightFeet
                            }
                            onChange={(e) => {
                              formField.onChange({
                                ...((formField.value as any) || {}),
                                feet: e.target.value,
                              });
                            }}
                          />
                          <Input
                            type="number"
                            placeholder="Inches"
                            value={
                              heightInches === undefined
                                ? ""
                                : heightInches
                            }
                            onChange={(e) => {
                              formField.onChange({
                                ...((formField.value as any) || {}),
                                inches: e.target.value,
                              });
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Height"
                            value={heightCm === undefined ? "" : heightCm}
                            onChange={(e) => {
                              formField.onChange({
                                ...((formField.value as any) || {}),
                                cm: e.target.value,
                              });
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                case "allergiesToggle":
                  return (
                    <ToggleGroup
                      type="multiple"
                      value={(formField.value as string[]) || []}
                      onValueChange={formField.onChange}
                      defaultValue={(formField.value as string[]) || []}
                      className="flex flex-wrap gap-2 justify-center"
                    >
                      {fieldData.options?.map((option: string) => (
                        <ToggleGroupItem key={option} value={option}>
                          {option}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  );
                case "weightInput":
                  const weightUnit = form.watch("weight.unit");
                  const weightKg = form.watch("weight.kg");
                  const weightLbs = form.watch("weight.pounds");
                  return (
                    <div className="space-y-2">
                      <ToggleGroup
                        type="single"
                        variant="outline"
                        value={weightUnit || "kg"}
                        onValueChange={(value) => {
                          if (value) {
                            formField.onChange({
                              ...((formField.value as any) || {}),
                              unit: value,
                            });
                          }
                        }}
                      >
                        {fieldData.options?.map((option: string) => (
                          <ToggleGroupItem key={option} value={option}>
                            {option}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>

                      {weightUnit === "lbs" ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Pounds"
                            value={
                              weightLbs === undefined ? "" : weightLbs
                            }
                            onChange={(e) => {
                              formField.onChange({
                                ...((formField.value as any) || {}),
                                pounds: e.target.value,
                              });
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Weight"
                            value={weightKg === undefined ? "" : weightKg}
                            onChange={(e) => {
                              formField.onChange({
                                ...((formField.value as any) || {}),
                                kg: e.target.value,
                              });
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                case "toggle-group":
                  return (
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      className="flex flex-wrap gap-2 justify-center"
                      value={(formField.value as string) || ""}
                      onValueChange={formField.onChange}
                      defaultValue={(formField.value as string) || ""}
                    >
                      {fieldData.options?.map((option: string) => (
                        <ToggleGroupItem
                          key={option}
                          value={option.toLowerCase()}
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
