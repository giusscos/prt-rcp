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

export interface Ingredients {
  id: string;
  name: string;
  user_id: number;
  nutritional_value: string;
  created_at: string;
  description: string;
  status: string;
  image_url: string;
  quantity: number;
  rating: number;
  unit_id: number;
}

export interface InsertIngredients {
  name: string;
  // nutritional_value: string;
  description: string;
  status: string;
  // image_url: string;
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