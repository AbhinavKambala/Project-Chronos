"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import AnalysisReport from "@/components/AnalysisReport";
import { AnalysisResult } from "@/types/analysis";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Sparkles, AlertCircle, FileImage } from "lucide-react";
import Link from "next/link";

export default function ImageAnalysisPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File, previewUrl: string) => {
    setSelectedFile(file);
    setImagePreview(previewUrl);
    setAnalysis(null);
    setError(null);
  };

  const handleClear = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedFile(null);
    setImagePreview(null);
    setAnalysis(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("/api/image-analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze image");
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during analysis");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileImage className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Image Analysis</h1>
              </div>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Introduction */}
        <Card className="p-6 mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-primary mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Historical Internet Artifact Analysis
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Upload screenshots, photos, or digital artifacts from internet history. 
                Our AI-powered archaeological analysis will identify the era, platform, 
                design elements, cultural context, and historical significance of your artifact 
                using Google Gemini Vision API.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Upload and Controls */}
          <div className="space-y-6">
            <ImageUploader
              onImageSelect={handleImageSelect}
              onClear={handleClear}
              selectedImage={imagePreview}
            />

            {selectedFile && !analysis && (
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                size="lg"
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Artifact...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analyze Historical Artifact
                  </>
                )}
              </Button>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isAnalyzing && (
              <Card className="p-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                  <div>
                    <h3 className="font-semibold mb-1">Processing Archaeological Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI is examining era indicators, design patterns, cultural markers, 
                      and historical significance...
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column: Analysis Results */}
          <div className="lg:col-span-1">
            {analysis && imagePreview ? (
              <AnalysisReport analysis={analysis} imageUrl={imagePreview} />
            ) : (
              <Card className="p-12 text-center border-dashed">
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                  <FileImage className="w-16 h-16 opacity-20" />
                  <div>
                    <p className="font-medium">No Analysis Yet</p>
                    <p className="text-sm">
                      Upload an image and click analyze to begin
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}