"use client";

import { FormState, formStateSchema } from "@/form/formZodSchema";
import { debounce } from "lodash";

export class FormLocalStorage {
  private static readonly KEY = "formData";
  private static readonly STATE_KEY = "formState";
  public static saveFormData(formData: FormState) {
    localStorage.setItem(this.KEY, JSON.stringify(formData));
  }

  public static saveState(state: string) {
    localStorage.setItem(this.STATE_KEY, state);
  }

  public static getState() {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem(this.STATE_KEY);
  }

  public static debouncedSaveFormData = debounce((formData: FormState) => {
    console.log("Saving form data", formData);
    this.saveFormData(formData);
  }, 350);

  public static getFormData() {
    if (typeof window === "undefined" || !localStorage.getItem(this.KEY)) {
      return null;
    }
    return formStateSchema.parse(
      JSON.parse(localStorage.getItem(this.KEY) as string)
    );
  }

  public static clearFormData() {
    localStorage.removeItem(this.KEY);
  }
}
