import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scissors, Loader2, Download } from 'lucide-react';
import { toast } from 'sonner';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

interface BackgroundRemoverProps {
  originalImage: { file: File; preview: string };
  onBackgroundRemoved: (file: File, preview: string) => void;
}

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
}

const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

const removeBackground = async (imageElement: HTMLImageElement): Promise<Blob> => {
  try {
    console.log('Starting background removal process...');
    const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
      device: 'webgpu',
    });
    
    // Convert HTMLImageElement to canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Resize image if needed and draw it to canvas
    const wasResized = resizeImageIfNeeded(canvas, ctx, imageElement);
    console.log(`Image ${wasResized ? 'was' : 'was not'} resized. Final dimensions: ${canvas.width}x${canvas.height}`);
    
    // Get image data as base64
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    console.log('Image converted to base64');
    
    // Process the image with the segmentation model
    console.log('Processing with segmentation model...');
    const result = await segmenter(imageData);
    
    console.log('Segmentation result:', result);
    
    if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
      throw new Error('Invalid segmentation result');
    }
    
    // Create a new canvas for the masked image
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = canvas.width;
    outputCanvas.height = canvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    
    if (!outputCtx) throw new Error('Could not get output canvas context');
    
    // Draw original image
    outputCtx.drawImage(canvas, 0, 0);
    
    // Apply the mask
    const outputImageData = outputCtx.getImageData(
      0, 0,
      outputCanvas.width,
      outputCanvas.height
    );
    const data = outputImageData.data;
    
    // Apply inverted mask to alpha channel
    for (let i = 0; i < result[0].mask.data.length; i++) {
      // Invert the mask value (1 - value) to keep the subject instead of the background
      const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
      data[i * 4 + 3] = alpha;
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    console.log('Mask applied successfully');
    
    // Convert canvas to blob
    return new Promise((resolve, reject) => {
      outputCanvas.toBlob(
        (blob) => {
          if (blob) {
            console.log('Successfully created final blob');
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/png',
        1.0
      );
    });
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

export const BackgroundRemover: React.FC<BackgroundRemoverProps> = ({ 
  originalImage, 
  onBackgroundRemoved 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<{ blob: Blob; preview: string } | null>(null);

  const handleRemoveBackground = async () => {
    setIsProcessing(true);
    try {
      // Load the image
      const imageElement = await loadImage(originalImage.file);
      
      // Remove background
      const resultBlob = await removeBackground(imageElement);
      
      // Create preview URL
      const preview = URL.createObjectURL(resultBlob);
      
      setProcessedImage({ blob: resultBlob, preview });
      toast.success('Background removed successfully!');
    } catch (error) {
      console.error('Background removal failed:', error);
      toast.error('Failed to remove background. Please try a different image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUseProcessedImage = () => {
    if (!processedImage) return;
    
    // Convert blob to file
    const file = new File([processedImage.blob], 'processed-image.png', { type: 'image/png' });
    onBackgroundRemoved(file, processedImage.preview);
  };

  return (
    <Card className="border border-accent/20">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">AI Background Removal</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Remove the background from your photo for a professional look
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original Image */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Original</h4>
              <img 
                src={originalImage.preview} 
                alt="Original" 
                className="w-full h-32 object-cover rounded border"
              />
            </div>

            {/* Processed Image */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Background Removed</h4>
              <div className="w-full h-32 border rounded flex items-center justify-center bg-gray-50">
                {isProcessing ? (
                  <div className="text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">Processing...</p>
                  </div>
                ) : processedImage ? (
                  <img 
                    src={processedImage.preview} 
                    alt="Processed" 
                    className="w-full h-full object-cover rounded"
                    style={{ backgroundColor: 'transparent' }}
                  />
                ) : (
                  <p className="text-xs text-muted-foreground text-center">
                    Click "Remove Background" to process
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            <Button 
              onClick={handleRemoveBackground}
              disabled={isProcessing}
              variant="outline"
              size="sm"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Removing...
                </>
              ) : (
                <>
                  <Scissors className="h-4 w-4 mr-2" />
                  Remove Background
                </>
              )}
            </Button>

            {processedImage && (
              <Button 
                onClick={handleUseProcessedImage}
                variant="default"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Use This Version
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
