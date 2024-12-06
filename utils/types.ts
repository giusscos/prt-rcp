export interface NavBarLink {
  label: string;
  href: string;
  title: string;
}

export interface Credentials {
  username: string;
  email: string;
  password: string;
}

export interface Profile {
  id: string;
  username: string;
}

export const productStatus = ["active", "draft", "archive"]

export type Status = "Active" | "Draft" | "Archive"

export interface NutritionalValue {
  kcal: number;
  carboidrates: number;
  sugar: number;
  proteins: number;
  fats: number;
  fibers: number;
}
export interface Ingredient {
  id: string;
  name: string;
  slug: string;
  user_id: number;
  nutritional_value: NutritionalValue;
  created_at: string;
  status: string;
  quantity: number;
  rating: number;
  unit_id: number;
  units: Units;
}

export interface InsertIngredient {
  name: string;
  slug: string;
  // nutritional_value: string;
  status: string;
  quantity: number;
  unit_id: number;
}

export type UnitsType = "solid" | "liquid" | "unitary"

export interface Units {
  id: number;
  name: string;
  abbreviation: string;
  type: UnitsType;
  created_at: string;
}