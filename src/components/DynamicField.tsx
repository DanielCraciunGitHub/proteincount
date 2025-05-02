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
                case "heightInput":
                  return (
                    <div className="space-y-2">
                      <ToggleGroup
                        type="single"
                        variant="outline"
                        value={(formField.value as any)?.unit || "metric"}
                        onValueChange={(value) => {
                          formField.onChange({
                            ...(formField.value as any),
                            unit: value,
                          });
                        }}
                      >
                        <ToggleGroupItem value="cm" size="sm">
                          cm
                        </ToggleGroupItem>
                        <ToggleGroupItem value="feet" size="sm">
                          feet
                        </ToggleGroupItem>
                      </ToggleGroup>

                      {(formField.value as any)?.unit === "feet" ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Feet"
                            value={(formField.value as any)?.feet || ""}
                            onChange={(e) => {
                              formField.onChange({
                                ...(formField.value as any),
                                feet: e.target.value,
                              });
                            }}
                          />
                          <Input
                            type="number"
                            placeholder="Inches"
                            value={(formField.value as any)?.inches || ""}
                            onChange={(e) => {
                              formField.onChange({
                                ...(formField.value as any),
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
                            value={(formField.value as any)?.cm || ""}
                            onChange={(e) => {
                              formField.onChange({
                                ...(formField.value as any),
                                cm: e.target.value,
                              });
                            }}
                          />
                          <span>cm</span>
                        </div>
                      )}
                    </div>
                  );
                case "allergiesToggle":
                  return (
                    <ToggleGroup
                      type="multiple"
                      value={formField.value as string[]}
                      onValueChange={formField.onChange}
                      defaultValue={formField.value as string[]}
                      className="flex flex-wrap gap-2 justify-center"
                    >
                      <ToggleGroupItem value="nuts">Nuts</ToggleGroupItem>
                      <ToggleGroupItem value="gluten">
                        Gluten
                      </ToggleGroupItem>
                      <ToggleGroupItem value="dairy">
                        Dairy
                      </ToggleGroupItem>
                      <ToggleGroupItem value="soy">Soy</ToggleGroupItem>
                      <ToggleGroupItem value="wheat">
                        Wheat
                      </ToggleGroupItem>
                    </ToggleGroup>
                  );
                case "weightInput":
                  return (
                    <div className="space-y-2">
                      <ToggleGroup
                        type="single"
                        variant="outline"
                        value={(formField.value as any)?.unit || "metric"}
                        onValueChange={(value) => {
                          formField.onChange({
                            ...(formField.value as any),
                            unit: value,
                          });
                        }}
                      >
                        <ToggleGroupItem value="kg" size="sm">
                          kg
                        </ToggleGroupItem>
                        <ToggleGroupItem value="lbs" size="sm">
                          lbs
                        </ToggleGroupItem>
                      </ToggleGroup>

                      {(formField.value as any)?.unit === "lbs" ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Pounds"
                            value={(formField.value as any)?.pounds || ""}
                            onChange={(e) => {
                              formField.onChange({
                                ...(formField.value as any),
                                pounds: e.target.value,
                              });
                            }}
                          />
                          <span>lbs</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Weight"
                            value={(formField.value as any)?.kg || ""}
                            onChange={(e) => {
                              formField.onChange({
                                ...(formField.value as any),
                                kg: e.target.value,
                              });
                            }}
                          />
                          <span>kg</span>
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
                      value={formField.value as string}
                      onValueChange={formField.onChange}
                      defaultValue={formField.value as string}
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
