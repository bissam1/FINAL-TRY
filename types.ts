export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  type: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  features: string[];
}

export interface Location {
  id: number;
  city: string;
  country: string;
  timezone: string;
  properties: number;
  description: string;
  image: string;
  agentName: string;
  agentPhoto: string;
}