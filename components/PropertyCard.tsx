interface Property {
  location: string;
  price: number;
  type: string;
  image: string;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-card/60 backdrop-blur-sm p-4 rounded-lg border border-border/20 transition-transform duration-300 hover:scale-105">
      <img 
        src={property.image} 
        alt={property.location}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold text-foreground mb-1">
        {property.location} - {property.type}
      </h3>
      <p className="text-muted-foreground">
        Price: AED {property.price.toLocaleString()}
      </p>
    </div>
  );
}