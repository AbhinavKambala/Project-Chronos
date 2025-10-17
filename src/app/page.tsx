"use client"

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileAudio, FileText, FileImage, Sparkles } from "lucide-react";
import "./basic-styles.css";;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Project Chronos</h1>
              <p className="text-sm text-muted-foreground">
                Unified Digital Analysis Platform
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Introduction */}
        <Card className="p-6 mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-primary mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Unified Digital Analysis Platform
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Process audio fragments, analyze text content, and examine historical internet artifacts 
                all in one place. Powered by Google Gemini AI for comprehensive digital analysis.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Audio Analysis */}
          <Link href="/audio-analysis">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <FileAudio className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Audio Fragment Cleaner</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Transcribe and clean poor quality audio files with background noise, 
                    fast speech, and multiple speakers.
                  </p>
                  <Button variant="outline" className="w-full">
                    Process Audio
                  </Button>
                </div>
              </div>
            </Card>
          </Link>

          {/* Text Analysis */}
          <Link href="/text-analysis">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50">
                  <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Text Analysis</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Analyze text content for insights, themes, and contextual information 
                    using advanced AI processing.
                  </p>
                  <Button variant="outline" className="w-full">
                    Analyze Text
                  </Button>
                </div>
              </div>
            </Card>
          </Link>

          {/* Image Analysis */}
          <Link href="/image-analysis">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50">
                  <FileImage className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Image Analysis</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Analyze historical internet artifacts and digital images for 
                    archaeological insights and context.
                  </p>
                  <Button variant="outline" className="w-full">
                    Analyze Image
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Powered by Google Gemini AI • 
            Unified platform for all digital analysis needs
          </p>
        </div>
      </main>
    </div>
  )
}