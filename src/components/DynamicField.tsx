"use client";

import { FormDataItem } from "@/form/formDataSchema";
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

import { MealsInput } from "./MealsInput";

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
      name={fieldData.key as keyof FormState}
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
                  return (
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="height.unit"
                        render={({ field }) => (
                          <ToggleGroup
                            type="single"
                            variant="outline"
                            value={field.value || "cm"}
                            onValueChange={(value) => {
                              if (value) {
                                field.onChange(value);
                              }
                            }}
                          >
                            {fieldData.options?.map((option: string) => (
                              <ToggleGroupItem key={option} value={option}>
                                {option}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        )}
                      />

                      {heightUnit === "feet" ? (
                        <div className="flex items-center gap-2">
                          <div className="w-full">
                            <FormField
                              control={form.control}
                              name="height.feet"
                              render={({ field }) => (
                                <>
                                  <Input
                                    type="number"
                                    placeholder="Feet"
                                    value={
                                      field.value === undefined
                                        ? ""
                                        : field.value
                                    }
                                    onChange={field.onChange}
                                  />
                                  <FormMessage />
                                </>
                              )}
                            />
                          </div>
                          <div className="w-full">
                            <FormField
                              control={form.control}
                              name="height.inches"
                              render={({ field }) => (
                                <>
                                  <Input
                                    type="number"
                                    placeholder="Inches"
                                    value={
                                      field.value === undefined
                                        ? ""
                                        : field.value
                                    }
                                    onChange={field.onChange}
                                  />
                                  <FormMessage />
                                </>
                              )}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-full">
                            <FormField
                              control={form.control}
                              name="height.cm"
                              render={({ field }) => (
                                <>
                                  <Input
                                    type="number"
                                    placeholder="Height"
                                    value={
                                      field.value === undefined
                                        ? ""
                                        : field.value
                                    }
                                    onChange={field.onChange}
                                  />
                                  <FormMessage />
                                </>
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                case "multi-toggle-group":
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
                  return (
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="weight.unit"
                        render={({ field }) => (
                          <ToggleGroup
                            type="single"
                            variant="outline"
                            value={field.value || "kg"}
                            onValueChange={(value) => {
                              if (value) {
                                field.onChange(value);
                              }
                            }}
                          >
                            {fieldData.options?.map((option: string) => (
                              <ToggleGroupItem key={option} value={option}>
                                {option}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        )}
                      />

                      {weightUnit === "lbs" ? (
                        <div className="flex items-center gap-2">
                          <div className="w-full">
                            <FormField
                              control={form.control}
                              name="weight.lbs"
                              render={({ field }) => (
                                <>
                                  <Input
                                    type="number"
                                    placeholder="Pounds"
                                    value={
                                      field.value === undefined
                                        ? ""
                                        : field.value
                                    }
                                    onChange={field.onChange}
                                  />
                                  <FormMessage />
                                </>
                              )}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-full">
                            <FormField
                              control={form.control}
                              name="weight.kg"
                              render={({ field }) => (
                                <>
                                  <Input
                                    type="number"
                                    placeholder="Weight"
                                    value={
                                      field.value === undefined
                                        ? ""
                                        : field.value
                                    }
                                    onChange={field.onChange}
                                  />
                                  <FormMessage />
                                </>
                              )}
                            />
                          </div>
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
                case "mealsInput":
                  return <MealsInput form={form} />;
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
