import { useState } from "react";
import { motion } from "framer-motion";

type Level = "beginner" | "intermediate" | "expert";

const explanations: Record<Level, { label: string; description: string; example: string }> = {
  beginner: {
    label: "🟢 Beginner",
    description: "The Driver Safety System is like a smart alarm clock for drivers. It watches the driver's face using a camera and if it notices them getting sleepy — like closing their eyes too long or yawning — it plays a loud alert to wake them up. Think of it as a helpful co-pilot that never gets tired.",
    example: "Camera watches face → Detects sleepy signs → Sounds alarm",
  },
  intermediate: {
    label: "🟡 Intermediate",
    description: "The system uses OpenCV for real-time video processing, capturing frames from a camera feed and running them through a CNN-based classification model. It detects drowsiness indicators (eye aspect ratio, yawn frequency, head tilt angle) and triggers alerts when thresholds are exceeded. The pipeline processes at ~30fps with <200ms latency.",
    example: "Video frames → Feature extraction → CNN classification → Threshold alerting",
  },
  expert: {
    label: "🔴 Expert",
    description: "The architecture implements a multi-stage perception pipeline: Haar cascade for face detection → dlib 68-point facial landmark extraction → EAR (Eye Aspect Ratio) computation with temporal smoothing using exponential moving average → CNN ensemble (MobileNetV2 backbone) for drowsiness classification. Alert logic uses a finite state machine with configurable hysteresis to minimize false positives. The system achieves 94% accuracy on our test dataset with a 2.8% FPR under varied illumination conditions using histogram equalization preprocessing.",
    example: "Haar cascade → dlib landmarks → EAR + temporal smoothing → CNN ensemble → FSM alerting",
  },
};

export default function ExplanationSwitcher() {
  const [level, setLevel] = useState<Level>("intermediate");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(Object.keys(explanations) as Level[]).map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              level === l
                ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground"
                : "glass text-muted-foreground"
            }`}
          >
            {explanations[l].label}
          </button>
        ))}
      </div>
      <motion.div
        key={level}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-lg p-4"
      >
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{explanations[level].description}</p>
        <div className="text-xs font-mono text-neon-cyan bg-muted/50 rounded-md px-3 py-2">
          {explanations[level].example}
        </div>
      </motion.div>
    </div>
  );
}
