import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Crop, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface PhotoUploadProps {
  onPhotoUpload: (file: File, preview: string) => void;
  uploadedPhoto?: { file: File; preview: string } | null;
  onRemovePhoto: () => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ 
  onPhotoUpload, 
  uploadedPhoto, 
  onRemovePhoto 
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Please upload an image smaller than 10MB');
      return;
    }

    setIsUploading(true);
    
    try {
      // Create preview URL
      const preview = URL.createObjectURL(file);
      onPhotoUpload(file, preview);
      toast.success('Photo uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload photo');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  }, [onPhotoUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    disabled: isUploading
  });

  if (uploadedPhoto) {
    return (
      <Card className="border-2 border-dashed border-primary/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative group">
              <img 
                src={uploadedPhoto.preview} 
                alt="Uploaded photo" 
                className="w-full h-48 object-cover rounded-lg shadow-soft"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" className="bg-white/90 text-black hover:bg-white">
                  <Crop className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onRemovePhoto}
                  className="bg-white/90 text-red-600 hover:bg-white hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {uploadedPhoto.file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(uploadedPhoto.file.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
      <CardContent className="p-6">
        <div 
          {...getRootProps()} 
          className={`cursor-pointer text-center space-y-4 ${
            isDragActive ? 'scale-105' : ''
          } transition-transform`}
        >
          <input {...getInputProps()} />
          
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Upload className={`h-8 w-8 text-primary ${isUploading ? 'animate-bounce' : ''}`} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              {isUploading ? 'Uploading...' : 'Upload Your Photo'}
            </h3>
            <p className="text-muted-foreground">
              {isDragActive 
                ? 'Drop your photo here...' 
                : 'Drag & drop a photo from your wedding, baby shower, or celebration'
              }
            </p>
            <p className="text-xs text-muted-foreground">
              Supports JPG, PNG, GIF, WebP • Max 10MB
            </p>
          </div>
          
          <Button 
            variant="outline" 
            disabled={isUploading}
            className="pointer-events-none"
          >
            Browse Files
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};