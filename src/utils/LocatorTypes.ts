export type LocatorStrategy =
  | { type: "role"; value: AriaRole; options?: { name?: string | RegExp } }
  | { type: "label"; value: string }
  | { type: "placeholder"; value: string }
  | { type: "text"; value: string | RegExp }
  | { type: "testId"; value: string }
  | { type: "css"; value: string }
  | { type: "xpath"; value: string };

type AriaRole =
  | "button"
  | "textbox"
  | "link"
  | "checkbox"
  | "heading"
  | "combobox"
  | "dialog"
  | "alert"
  | "list"
  | "listitem";
