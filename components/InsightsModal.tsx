import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  isLoading: boolean;
}

export default function InsightsModal({ 
  isOpen, 
  onClose, 
  title, 
  content, 
  isLoading 
}: InsightsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-lg animate-scale-in">
        <div className="p-6">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <h3 className="text-2xl font-bold mb-4 text-foreground pr-8">
            {title}
          </h3>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="text-muted-foreground whitespace-pre-wrap">
              {content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}