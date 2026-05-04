import { useRef, useState, useEffect } from "react";
import { View, PanResponder, Platform, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Stroke } from "../types/planner";

interface Props {
  paths: Stroke[];
  onSave: (paths: Stroke[]) => void;
  color?: string;
  active?: boolean; // when false, renders strokes but blocks no interaction
}

// ─── Web implementation ───────────────────────────────────────────────────────
// Uses the Pointer Events API so Apple Pencil pressure + type are available

function WebDrawingCanvas({ paths, onSave, color = "#2c2c2c", active = true }: Props) {
  const containerRef = useRef<any>(null);
  const currentPathRef = useRef<string | null>(null);
  const currentWidthRef = useRef<number>(2);
  const isDrawing = useRef(false);

  const getCoords = (e: PointerEvent, rect: DOMRect) => ({
    x: (e.clientX - rect.left).toFixed(1),
    y: (e.clientY - rect.top).toFixed(1),
  });

  const getStrokeWidth = (e: PointerEvent) => {
    // Apple Pencil gives pressure 0–1, mouse/touch give 0 or 0.5
    if (e.pointerType === "pen") {
      return Math.max(1, e.pressure * 6); // 1–6px based on pressure
    }
    return 2;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !active) return;

    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const { x, y } = getCoords(e, rect);
      currentPathRef.current = `M ${x} ${y}`;
      currentWidthRef.current = getStrokeWidth(e);
      isDrawing.current = true;
    };

    const onMove = (e: PointerEvent) => {
      if (!isDrawing.current || !currentPathRef.current) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const { x, y } = getCoords(e, rect);
      currentPathRef.current += ` L ${x} ${y}`;

      // Live preview — update SVG path directly for performance
      const preview = el.querySelector("#preview-path");
      if (preview) {
        preview.setAttribute("d", currentPathRef.current);
        preview.setAttribute("stroke-width", String(getStrokeWidth(e)));
      }
    };

    const onUp = (e: PointerEvent) => {
      if (!isDrawing.current || !currentPathRef.current) return;
      onSave([...paths, { d: currentPathRef.current, width: currentWidthRef.current }]);
      currentPathRef.current = null;
      isDrawing.current = false;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointerleave", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointerleave", onUp);
    };
  }, [paths, onSave, active]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute", inset: 0,
        touchAction: active ? "none" : "auto",
        cursor: active ? "crosshair" : "default",
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <svg style={{ width: "100%", height: "100%", position: "absolute" }}>
        {paths.map((stroke, i) => (
          <path
            key={i}
            d={stroke.d}
            stroke={color}
            strokeWidth={stroke.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
        {/* Live preview path updated directly via DOM for zero lag */}
        <path
          id="preview-path"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

// ─── Native implementation ────────────────────────────────────────────────────
// Uses PanResponder for iOS/Android touch + Apple Pencil

function NativeDrawingCanvas({ paths, onSave, color = "#2c2c2c" }: Props) {
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const isDrawing = useRef(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      isDrawing.current = true;
      setCurrentPath(`M ${locationX.toFixed(1)} ${locationY.toFixed(1)}`);
    },

    onPanResponderMove: (evt) => {
      if (!isDrawing.current) return;
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentPath((prev) =>
        prev ? `${prev} L ${locationX.toFixed(1)} ${locationY.toFixed(1)}` : prev
      );
    },

    onPanResponderRelease: () => {
      if (currentPath) {
        onSave([...paths, { d: currentPath, width: 2 }]);
      }
      setCurrentPath(null);
      isDrawing.current = false;
    },
  });

  return (
    <View style={StyleSheet.absoluteFill} {...panResponder.panHandlers}>
      <Svg style={StyleSheet.absoluteFill}>
        {paths.map((stroke, i) => (
          <Path
            key={i}
            d={stroke.d}
            stroke={color}
            strokeWidth={stroke.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
        {currentPath && (
          <Path
            d={currentPath}
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        )}
      </Svg>
    </View>
  );
}

// ─── Unified export ───────────────────────────────────────────────────────────

export default function DrawingCanvas(props: Props) {
  if (Platform.OS === "web") {
    return <WebDrawingCanvas {...props} />;
  }
  return <NativeDrawingCanvas {...props} />;
}
