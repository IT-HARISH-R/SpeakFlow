import { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function VoiceAnalysis() {
  const [isRecording, setIsRecording] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setAnalysis({ clarity: 85, speed: 120, pronunciation: 90 });
      }, 3000);
    } else {
      setAnalysis(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-lg shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Voice Analysis</h2>
          <div className="flex justify-center mb-4">
            <Button onClick={handleRecording} className="rounded-full p-4 text-white bg-blue-500 hover:bg-blue-600">
              {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
            </Button>
          </div>
          {isRecording && <p className="text-center text-gray-600">Recording...</p>}
          {analysis && (
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-gray-700">Clarity: {analysis.clarity}%</p>
                <Progress value={analysis.clarity} />
              </div>
              <div>
                <p className="text-gray-700">Speed: {analysis.speed} WPM</p>
                <Progress value={analysis.speed / 2} />
              </div>
              <div>
                <p className="text-gray-700">Pronunciation: {analysis.pronunciation}%</p>
                <Progress value={analysis.pronunciation} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
