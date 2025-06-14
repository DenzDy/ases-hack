'use client';

import { FileText, Image, File, X } from 'lucide-react';
import { Button } from './button';

type FilePreview = {
  id: string;
  name: string;
  type: string;
  file: File;
};

interface FileUploadProps {
  files: FilePreview[];
  onRemove: (id: string) => void;
}

export function FileUpload({ files, onRemove }: FileUploadProps) {
  const getFileIcon = (type: string) => {
    const typePrefix = type.split('/')[0];
    switch(typePrefix) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {files.map((file) => (
        <div 
          key={file.id}
          className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-sm"
        >
          {getFileIcon(file.type)}
          <span className="max-w-[120px] truncate">{file.name}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 text-muted-foreground hover:text-foreground"
            onClick={() => onRemove(file.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}