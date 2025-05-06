"use client";

import { FormState } from "@/form/formZodSchema";
import { debounce } from "lodash";

export class FormLocalStorage {
  private static readonly KEY = "formData";
  private static readonly STATE_KEY = "formState";
  private static readonly ID_KEY = "formId";

  public static saveFormData(formData: FormState) {
    localStorage.setItem(this.KEY, JSON.stringify(formData));
  }

  public static saveFormId(id: string) {
    localStorage.setItem(this.ID_KEY, id);
  }

  public static getFormId() {
    return localStorage.getItem(this.ID_KEY);
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
    try {
      return JSON.parse(localStorage.getItem(this.KEY) as string);
    } catch (error) {
      console.error("Error parsing form data", error);
      return null;
    }
  }

  public static clearFormData() {
    localStorage.removeItem(this.KEY);
  }
}
